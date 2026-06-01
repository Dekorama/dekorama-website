#!/usr/bin/env node
/**
 * keyword-research.js
 *
 * Fetches search queries from Google Search Console where your site ranks
 * between position 5–20 (near-ranking, highest ROI for new content).
 * Sorts by "missed traffic" = impressions × (1 − CTR).
 * Writes the top candidates to scripts/keywords-queue.json.
 *
 * Usage:
 *   node scripts/keyword-research.js
 *   node scripts/keyword-research.js --days 90 --top 30 --min-impressions 20
 *   node scripts/keyword-research.js --dry-run   (print only, don't write queue)
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_JSON  Base64-encoded service account JSON
 *   GOOGLE_SEARCH_CONSOLE_SITE_URL  e.g. https://www.dekoramagroup.com
 */

'use strict';

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load .env.local for local development (no-op in CI where env vars are set directly)
(function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
})();

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    days: 60,
    top: 20,
    minImpressions: 10,
    minPosition: 5,
    maxPosition: 20,
    dryRun: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--days':          opts.days = parseInt(args[++i], 10); break;
      case '--top':           opts.top = parseInt(args[++i], 10); break;
      case '--min-impressions': opts.minImpressions = parseInt(args[++i], 10); break;
      case '--min-position':  opts.minPosition = parseFloat(args[++i]); break;
      case '--max-position':  opts.maxPosition = parseFloat(args[++i]); break;
      case '--dry-run':       opts.dryRun = true; break;
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------
function toDateString(date) {
  return date.toISOString().split('T')[0];
}

function getDateRange(days) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  return { startDate: toDateString(start), endDate: toDateString(end) };
}

// ---------------------------------------------------------------------------
// Google Search Console auth
// ---------------------------------------------------------------------------
function getAuth() {
  const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!b64) {
    throw new Error(
      'Missing env var: GOOGLE_SERVICE_ACCOUNT_JSON\n' +
      'Set it to the base64-encoded contents of your service account JSON file.\n' +
      'Generate with: base64 -i service-account.json | tr -d "\\n"'
    );
  }

  let credentials;
  try {
    credentials = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid base64-encoded JSON.');
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
}

// ---------------------------------------------------------------------------
// Fetch search analytics
// ---------------------------------------------------------------------------
async function fetchSearchAnalytics(auth, siteUrl, startDate, endDate) {
  const webmasters = google.searchconsole({ version: 'v1', auth });

  const res = await webmasters.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 2000,
      dataState: 'all',
    },
  });

  return res.data.rows || [];
}

// ---------------------------------------------------------------------------
// Score and filter rows
// ---------------------------------------------------------------------------
function processRows(rows, opts) {
  return rows
    .filter((row) => {
      const pos = row.position;
      return (
        pos >= opts.minPosition &&
        pos <= opts.maxPosition &&
        row.impressions >= opts.minImpressions
      );
    })
    .map((row) => {
      const missedTraffic = Math.round(row.impressions * (1 - (row.ctr || 0)));
      return {
        keyword: row.keys[0],
        position: Math.round(row.position * 10) / 10,
        impressions: row.impressions,
        clicks: row.clicks,
        ctr: `${Math.round((row.ctr || 0) * 1000) / 10}%`,
        missedTraffic,
      };
    })
    .sort((a, b) => b.missedTraffic - a.missedTraffic)
    .slice(0, opts.top);
}

// ---------------------------------------------------------------------------
// Merge into queue (avoid duplicates)
// ---------------------------------------------------------------------------
function mergeIntoQueue(newKeywords) {
  const queuePath = path.join(process.cwd(), 'scripts', 'keywords-queue.json');

  let existing = [];
  if (fs.existsSync(queuePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
    } catch {
      existing = [];
    }
  }

  const existingSet = new Set(existing.map((k) => k.keyword.toLowerCase()));
  const today = new Date().toISOString().split('T')[0];

  const toAdd = newKeywords
    .filter((k) => !existingSet.has(k.keyword.toLowerCase()))
    .map((k) => ({
      keyword: k.keyword,
      locale: 'both',
      added: today,
      status: 'pending',
      impressions: k.impressions,
      position: k.position,
      missedTraffic: k.missedTraffic,
    }));

  const updated = [...toAdd, ...existing];
  fs.writeFileSync(queuePath, JSON.stringify(updated, null, 2) + '\n');
  return toAdd.length;
}

// ---------------------------------------------------------------------------
// Print table
// ---------------------------------------------------------------------------
function printTable(rows) {
  const col = (s, w) => String(s).padEnd(w);
  const header = `${'KEYWORD'.padEnd(55)} ${'POS'.padStart(6)} ${'IMPR'.padStart(7)} ${'CTR'.padStart(7)} ${'MISSED'.padStart(8)}`;
  const sep = '-'.repeat(header.length);
  console.log('\n' + header);
  console.log(sep);
  for (const r of rows) {
    console.log(
      `${col(r.keyword, 55)} ${col(r.position, 6).padStart(6)} ${col(r.impressions, 7).padStart(7)} ${col(r.ctr, 7).padStart(7)} ${col(r.missedTraffic, 8).padStart(8)}`
    );
  }
  console.log(sep);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  const opts = parseArgs();
  const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;

  if (!siteUrl) {
    console.error('Error: Missing env var GOOGLE_SEARCH_CONSOLE_SITE_URL');
    console.error('Example: GOOGLE_SEARCH_CONSOLE_SITE_URL=https://www.dekoramagroup.com');
    process.exit(1);
  }

  const { startDate, endDate } = getDateRange(opts.days);
  console.log(`\nFetching GSC data for ${siteUrl}`);
  console.log(`Date range: ${startDate} → ${endDate} (${opts.days} days)`);
  console.log(`Filtering: position ${opts.minPosition}–${opts.maxPosition}, min ${opts.minImpressions} impressions\n`);

  let auth;
  try {
    auth = getAuth();
  } catch (err) {
    console.error(`Auth error: ${err.message}`);
    process.exit(1);
  }

  let rows;
  try {
    rows = await fetchSearchAnalytics(auth, siteUrl, startDate, endDate);
  } catch (err) {
    console.error(`GSC API error: ${err.message}`);
    if (err.message.includes('403')) {
      console.error('Make sure the service account has been granted access to this property in Search Console.');
    }
    process.exit(1);
  }

  if (!rows.length) {
    console.log('No data returned. Check site URL and date range.');
    process.exit(0);
  }

  const processed = processRows(rows, opts);

  if (!processed.length) {
    console.log(`No queries found with position ${opts.minPosition}–${opts.maxPosition} and ≥${opts.minImpressions} impressions.`);
    process.exit(0);
  }

  printTable(processed);
  console.log(`\nFound ${processed.length} near-ranking keywords.`);

  if (opts.dryRun) {
    console.log('\n--dry-run: queue not updated.');
    process.exit(0);
  }

  const added = mergeIntoQueue(processed);
  console.log(`Added ${added} new keywords to scripts/keywords-queue.json (${processed.length - added} already in queue).`);
  console.log('\nRun "npm run generate:post:next" to generate a post from the queue.');
})();
