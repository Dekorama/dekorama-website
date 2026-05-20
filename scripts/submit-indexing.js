#!/usr/bin/env node
/**
 * submit-indexing.js
 *
 * Submits newly published blog post URLs to the Google Indexing API
 * so they get crawled and indexed within hours instead of days/weeks.
 *
 * Requires the service account to have the "Owner" role in Google Search Console
 * (Viewer is not sufficient for the Indexing API).
 *
 * Usage:
 *   node scripts/submit-indexing.js --es-slug "slug-en-espanol" --en-slug "slug-in-english"
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_JSON   base64-encoded service account JSON
 *
 * Optional env vars:
 *   NEXT_PUBLIC_SITE_URL          Default: https://www.dekoramagroup.com
 */

'use strict';

const { google } = require('googleapis');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dekoramagroup.com';
const INDEXING_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { esSlug: null, enSlug: null };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--es-slug': opts.esSlug = args[++i]; break;
      case '--en-slug': opts.enSlug = args[++i]; break;
    }
  }

  if (!opts.esSlug && !opts.enSlug) {
    console.error('Error: provide at least one of --es-slug or --en-slug');
    process.exit(1);
  }

  return opts;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
function getAuthClient() {
  const encoded = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!encoded) {
    throw new Error(
      'Missing env var: GOOGLE_SERVICE_ACCOUNT_JSON\n' +
      'Encode with: base64 -i service-account.json | tr -d "\\n"'
    );
  }

  let credentials;
  try {
    credentials = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid base64-encoded JSON');
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
}

// ---------------------------------------------------------------------------
// Submit a single URL
// ---------------------------------------------------------------------------
async function submitUrl(authClient, url) {
  const token = await authClient.getAccessToken();
  const accessToken = token.token || token;

  const response = await fetch(INDEXING_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      url,
      type: 'URL_UPDATED',
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const code = data.error?.code;
    const message = data.error?.message || JSON.stringify(data);

    if (code === 403) {
      throw new Error(
        `Indexing API 403 Forbidden for ${url}\n` +
        'The service account must be added as an OWNER in Google Search Console\n' +
        '(Settings → Users and permissions → Add user → Owner role).\n' +
        'Viewer permission is not sufficient for the Indexing API.'
      );
    }
    throw new Error(`Indexing API error ${response.status} for ${url}: ${message}`);
  }

  return data;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  const { esSlug, enSlug } = parseArgs();

  const urls = [
    esSlug && `${SITE_URL}/es/blog/${esSlug}`,
    enSlug && `${SITE_URL}/en/blog/${enSlug}`,
  ].filter(Boolean);

  console.log(`\nSubmitting ${urls.length} URL(s) to Google Indexing API...`);

  let authClient;
  try {
    authClient = await getAuthClient().getClient();
  } catch (err) {
    console.error(`Auth error: ${err.message}`);
    process.exit(1);
  }

  let allOk = true;
  for (const url of urls) {
    try {
      const result = await submitUrl(authClient, url);
      const notifyTime = result.urlNotificationMetadata?.latestUpdate?.notifyTime || 'unknown';
      console.log(`✓ Submitted: ${url} (notifyTime: ${notifyTime})`);
    } catch (err) {
      console.error(`✗ Failed:    ${url}`);
      console.error(`  ${err.message}`);
      allOk = false;
    }
  }

  if (!allOk) {
    console.error('\nSome URLs failed to submit. Check errors above.');
    process.exit(1);
  }

  console.log('\nDone. Google will crawl these URLs within a few hours.');
})();
