#!/usr/bin/env node
/**
 * Merges curated seed keywords into scripts/keywords-queue.json.
 *
 * Usage:
 *   node scripts/seed-keywords-queue.js
 *   node scripts/seed-keywords-queue.js --dry-run
 *   node scripts/seed-keywords-queue.js --target 200
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { buildSeedKeywords } = require('./data/keyword-seeds');

const QUEUE_PATH = path.join(process.cwd(), 'scripts', 'keywords-queue.json');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { dryRun: false, target: null };
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--dry-run') opts.dryRun = true;
    if (args[i] === '--target') opts.target = parseInt(args[++i], 10);
  }
  return opts;
}

function normalizeKeyword(keyword) {
  return keyword.trim().toLowerCase().replace(/\s+/g, ' ');
}

function loadQueue() {
  if (!fs.existsSync(QUEUE_PATH)) return [];
  return JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
}

function main() {
  const opts = parseArgs();
  const existing = loadQueue();
  const existingSet = new Set(existing.map((item) => normalizeKeyword(item.keyword)));

  const seeds = buildSeedKeywords();
  const today = new Date().toISOString().split('T')[0];
  const toAdd = [];

  for (const keyword of seeds) {
    const key = normalizeKeyword(keyword);
    if (existingSet.has(key)) continue;
    existingSet.add(key);
    toAdd.push({
      keyword,
      locale: 'both',
      added: today,
      status: 'pending',
      source: 'seed',
    });
    if (opts.target && toAdd.length >= opts.target) break;
  }

  const pendingBefore = existing.filter((item) => item.status === 'pending').length;
  const updated = [...existing, ...toAdd];

  console.log(`Seed library: ${seeds.length} unique phrases`);
  console.log(`Queue before: ${existing.length} total (${pendingBefore} pending)`);
  console.log(`Adding: ${toAdd.length} new pending keywords`);

  if (opts.dryRun) {
    console.log('\n--dry-run: first 15 that would be added:');
    toAdd.slice(0, 15).forEach((item) => console.log(`  - ${item.keyword}`));
    process.exit(0);
  }

  fs.writeFileSync(QUEUE_PATH, `${JSON.stringify(updated, null, 2)}\n`);
  const pendingAfter = updated.filter((item) => item.status === 'pending').length;
  console.log(`Queue after: ${updated.length} total (${pendingAfter} pending)`);
}

main();
