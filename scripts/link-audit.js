#!/usr/bin/env node
/**
 * link-audit.js
 *
 * Scans all published blog posts and cross-references outbound links against
 * the partner registry in scripts/link-partners.json.
 *
 * Reports:
 *   - Which articles link to each partner domain
 *   - Active partners with zero article mentions (need attention)
 *   - All external domains found across the blog (to spot unknown outbound links)
 *
 * Usage:
 *   node scripts/link-audit.js
 *   node scripts/link-audit.js --active-only   # Only show active partners
 *   node scripts/link-audit.js --json           # Machine-readable JSON output
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const PARTNERS_PATH = path.join(ROOT, 'scripts', 'link-partners.json');

// ---------------------------------------------------------------------------
// Args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const ACTIVE_ONLY = args.includes('--active-only');
const JSON_OUTPUT = args.includes('--json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function loadPartners() {
  if (!fs.existsSync(PARTNERS_PATH)) {
    console.error(`No partner registry found at ${PARTNERS_PATH}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(PARTNERS_PATH, 'utf8')).partners || [];
}

function collectMarkdownFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const locale of fs.readdirSync(dir)) {
    const localeDir = path.join(dir, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;
    for (const file of fs.readdirSync(localeDir)) {
      if (file.endsWith('.md')) {
        files.push({ locale, slug: file.replace(/\.md$/, ''), filePath: path.join(localeDir, file) });
      }
    }
  }
  return files;
}

/**
 * Extracts all external link URLs from a markdown body.
 * Matches [text](https://...) patterns.
 */
function extractExternalLinks(content) {
  const urls = [];
  const re = /\]\((https?:\/\/[^\s)]+)\)/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(function main() {
  const partners = loadPartners();
  const posts = collectMarkdownFiles(BLOG_DIR);

  if (posts.length === 0) {
    console.log('No blog posts found.');
    process.exit(0);
  }

  // Build a map: domain → list of matching partner objects
  const domainToPartner = {};
  for (const partner of partners) {
    const d = partner.domain.replace(/^www\./, '');
    domainToPartner[d] = partner;
  }

  // Scan each post for external links
  const postLinkMap = {}; // slug → [{ url, domain, partnerId? }]
  const partnerMentions = {}; // partnerId → [{ locale, slug, url }]
  const unknownDomains = new Set();

  for (const { locale, slug, filePath } of posts) {
    const content = fs.readFileSync(filePath, 'utf8');
    const urls = extractExternalLinks(content);
    const key = `${locale}/${slug}`;
    postLinkMap[key] = [];

    for (const url of urls) {
      const domain = domainOf(url);
      const partner = domainToPartner[domain];
      const entry = { url, domain, partnerId: partner ? partner.id : null };
      postLinkMap[key].push(entry);

      if (partner) {
        if (!partnerMentions[partner.id]) partnerMentions[partner.id] = [];
        partnerMentions[partner.id].push({ locale, slug, url });
      } else {
        unknownDomains.add(domain);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Build report
  // ---------------------------------------------------------------------------
  const report = {
    scannedAt: new Date().toISOString(),
    totalPosts: posts.length,
    partners: [],
    unknownExternalDomains: [...unknownDomains].sort(),
  };

  for (const partner of partners) {
    if (ACTIVE_ONLY && partner.status !== 'active') continue;
    const mentions = partnerMentions[partner.id] || [];
    report.partners.push({
      id: partner.id,
      name: partner.name,
      domain: partner.domain,
      status: partner.status,
      mentionCount: mentions.length,
      mentions,
      needsAttention: partner.status === 'active' && mentions.length === 0,
    });
  }

  if (JSON_OUTPUT) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  // ---------------------------------------------------------------------------
  // Human-readable output
  // ---------------------------------------------------------------------------
  const LINE = '─'.repeat(64);

  console.log(`\nDekorama Link Exchange Audit`);
  console.log(`Scanned ${report.totalPosts} blog posts across all locales`);
  console.log(LINE);

  const needsAttention = report.partners.filter((p) => p.needsAttention);
  if (needsAttention.length > 0) {
    console.log(`\n⚠  Active partners with NO article mentions (${needsAttention.length}):`);
    for (const p of needsAttention) {
      console.log(`   • ${p.name} (${p.domain})`);
    }
  }

  console.log(`\nPartner coverage:`);
  for (const p of report.partners) {
    const badge = p.status === 'active' ? '[active]'
      : p.status === 'contacted' ? '[contacted]'
      : p.status === 'paused' ? '[paused]'
      : '[prospect]';

    console.log(`\n  ${p.name} ${badge}`);
    console.log(`  ${p.domain} — ${p.mentionCount} article mention(s)`);

    if (p.mentions.length > 0) {
      for (const m of p.mentions) {
        console.log(`    → ${m.locale}/blog/${m.slug}`);
        console.log(`      ${m.url}`);
      }
    }
  }

  if (report.unknownExternalDomains.length > 0) {
    console.log(`\n${LINE}`);
    console.log(`Other external domains found in blog posts:`);
    for (const d of report.unknownExternalDomains) {
      console.log(`  • ${d}`);
    }
  }

  console.log(`\n${LINE}`);
  console.log(`Run with --json for machine-readable output.`);
  console.log(`Run with --active-only to show only active partners.\n`);
})();
