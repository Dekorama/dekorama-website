#!/usr/bin/env node
/**
 * generate-post.js
 *
 * Generates a bilingual (ES + EN) SEO blog post using Google Gemini Flash,
 * writes the markdown files, and updates src/lib/blogSlugMap.js.
 *
 * Usage:
 *   node scripts/generate-post.js --keyword "suelos porcelanicos Marbella"
 *   node scripts/generate-post.js --from-queue
 *   node scripts/generate-post.js --keyword "cocinas con isla" --dry-run
 *
 * Required env vars:
 *   GEMINI_API_KEY   From https://aistudio.google.com
 *
 * Optional env vars:
 *   GEMINI_MODEL     Default: gemini-2.0-flash
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { buildSystemPrompt } = require('./prompts/system');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = process.cwd();
const QUEUE_PATH = path.join(ROOT, 'scripts', 'keywords-queue.json');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const SLUG_MAP_PATH = path.join(ROOT, 'src', 'lib', 'blogSlugMap.js');

function blogFilePath(locale, slug) {
  return path.join(BLOG_DIR, locale, `${slug}.md`);
}

function slugExistsInMap(slug) {
  if (!fs.existsSync(SLUG_MAP_PATH)) return false;
  return fs.readFileSync(SLUG_MAP_PATH, 'utf8').includes(`'${slug}'`);
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    keyword: null,
    fromQueue: false,
    dryRun: false,
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--keyword':    opts.keyword = args[++i]; break;
      case '--from-queue': opts.fromQueue = true; break;
      case '--dry-run':    opts.dryRun = true; break;
      case '--model':      opts.model = args[++i]; break;
    }
  }

  if (!opts.keyword && !opts.fromQueue) {
    console.error('Error: provide --keyword "..." or --from-queue');
    console.error('Examples:');
    console.error('  node scripts/generate-post.js --keyword "suelos porcelanicos Marbella"');
    console.error('  node scripts/generate-post.js --from-queue');
    process.exit(1);
  }

  return opts;
}

// ---------------------------------------------------------------------------
// Queue helpers
// ---------------------------------------------------------------------------
function readQueue() {
  if (!fs.existsSync(QUEUE_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
  } catch {
    return [];
  }
}

function getNextFromQueue() {
  const queue = readQueue();
  const next = queue.find((k) => k.status === 'pending');
  if (!next) {
    console.log('Queue is empty or all keywords are processed.');
    console.log('Run "npm run research:keywords" to populate the queue.');
    process.exit(0);
  }
  return next.keyword;
}

function markKeywordDone(keyword) {
  const queue = readQueue();
  const updated = queue.map((k) =>
    k.keyword === keyword ? { ...k, status: 'done', processedAt: new Date().toISOString() } : k
  );
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(updated, null, 2) + '\n');
}

// ---------------------------------------------------------------------------
// Gemini generation
// ---------------------------------------------------------------------------
async function generateArticle(keyword, model) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing env var: GEMINI_API_KEY\n' +
      'Get your free key at https://aistudio.google.com'
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const generativeModel = genAI.getGenerativeModel({
    model,
    systemInstruction: buildSystemPrompt('both'),
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  });

  const prompt = `Generate a complete bilingual SEO blog post for this keyword/topic: "${keyword}"

The article must target Spanish renovation customers on the Costa del Sol AND English-speaking expats/investors in the same area.
Return the JSON object as specified in your instructions.`;

  console.log(`\nCalling Gemini (${model}) for keyword: "${keyword}"...`);
  const startTime = Date.now();

  const result = await generativeModel.generateContent(prompt);
  const raw = result.response.text();
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Response received in ${elapsed}s (${raw.length} chars)`);

  return parseGeminiResponse(raw);
}

// ---------------------------------------------------------------------------
// Cover image generation via Gemini
// ---------------------------------------------------------------------------
async function generateCoverImage(keyword, slug, apiKey, dryRun) {
  const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'blog');

  if (dryRun) {
    console.log('[DRY RUN] Would generate cover image with Gemini.');
    return '/images/blog/placeholder.jpg';
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-preview-image-generation',
  });

  const imagePrompt =
    `Professional interior design photograph for a renovation article about "${keyword}". ` +
    `Modern high-end home, Mediterranean aesthetic. Bright natural light, clean composition. ` +
    `No text, no watermarks, no people, no logos. Landscape orientation.`;

  console.log('Generating cover image with Gemini...');

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: imagePrompt }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  });

  const parts = result.response.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData);

  if (!imagePart) {
    throw new Error('Gemini image generation returned no image data');
  }

  const { data, mimeType } = imagePart.inlineData;
  const ext = mimeType === 'image/jpeg' ? 'jpg' : 'png';
  const filename = `${slug}.${ext}`;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), Buffer.from(data, 'base64'));
  console.log(`Cover image saved: public/images/blog/${filename}`);

  return `/images/blog/${filename}`;
}

// ---------------------------------------------------------------------------
// Parse Gemini JSON response (handles accidental markdown fences)
// ---------------------------------------------------------------------------
function parseGeminiResponse(raw) {
  // Strip markdown code fences if present
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    // Attempt to extract JSON object from surrounding text
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error('\n--- RAW RESPONSE ---\n', raw.slice(0, 500));
      throw new Error(`Gemini response is not valid JSON: ${err.message}`);
    }
    try {
      parsed = JSON.parse(match[0]);
    } catch {
      console.error('\n--- RAW RESPONSE ---\n', raw.slice(0, 500));
      throw new Error('Could not parse JSON from Gemini response.');
    }
  }

  // Validate required fields
  const required = ['slug_es', 'slug_en', 'title_es', 'title_en', 'excerpt_es', 'excerpt_en', 'article_es', 'article_en'];
  for (const field of required) {
    if (!parsed[field]) {
      throw new Error(`Gemini response is missing required field: "${field}"`);
    }
  }

  // Sanitize slugs (defensive)
  parsed.slug_es = sanitizeSlug(parsed.slug_es);
  parsed.slug_en = sanitizeSlug(parsed.slug_en);

  return parsed;
}

function sanitizeSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function ensureUniqueSlugPair(esSlug, enSlug) {
  let attempt = 0;

  while (attempt < 50) {
    const suffix = attempt === 0 ? '' : `-${attempt + 1}`;
    const candidateEs = `${esSlug}${suffix}`;
    const candidateEn = `${enSlug}${suffix}`;

    const hasCollision =
      fs.existsSync(blogFilePath('es', candidateEs)) ||
      fs.existsSync(blogFilePath('en', candidateEn)) ||
      slugExistsInMap(candidateEs) ||
      slugExistsInMap(candidateEn);

    if (!hasCollision) {
      return { es: candidateEs, en: candidateEn };
    }

    attempt += 1;
  }

  throw new Error('Could not resolve a unique slug pair after 50 attempts.');
}

function countWords(text) {
  return text
    .replace(/[#>*_`|\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function validateArticleBody(body, locale) {
  const label = locale === 'es' ? 'Spanish' : 'English';
  const wordCount = countWords(body);
  const h2Count = (body.match(/^##\s+/gm) || []).length;
  const hasFaq = locale === 'es'
    ? /^##\s+Preguntas frecuentes/m.test(body)
    : /^##\s+Frequently asked questions/m.test(body);
  const internalLinks = locale === 'es'
    ? (body.match(/\]\(\/es\//g) || []).length
    : (body.match(/\]\(\/en\//g) || []).length;

  if (/^#\s+/m.test(body)) {
    throw new Error(`${label} article must not include an H1 heading.`);
  }

  if (wordCount < 900) {
    throw new Error(`${label} article is too short (${wordCount} words). Minimum is 900.`);
  }

  if (h2Count < 5) {
    throw new Error(`${label} article must contain at least 5 H2 sections.`);
  }

  if (internalLinks < 2) {
    throw new Error(`${label} article must include at least 2 internal links.`);
  }

  if (!hasFaq) {
    throw new Error(`${label} article must end with a FAQ section.`);
  }
}

function validateGeneratedPost(parsed) {
  validateArticleBody(parsed.article_es, 'es');
  validateArticleBody(parsed.article_en, 'en');
}

// ---------------------------------------------------------------------------
// Write markdown files
// ---------------------------------------------------------------------------
function buildMarkdown(title, excerpt, coverImage, date, body) {
  return [
    '---',
    `title: ${JSON.stringify(title)}`,
    `excerpt: ${JSON.stringify(excerpt)}`,
    `date: "${date}"`,
    `coverImage: "${coverImage}"`,
    '---',
    '',
    body.trim(),
    '',
  ].join('\n');
}

function writeMarkdownFiles(parsed, dryRun) {
  const today = new Date().toISOString().split('T')[0];

  const files = [
    {
      filePath: path.join(BLOG_DIR, 'es', `${parsed.slug_es}.md`),
      content: buildMarkdown(parsed.title_es, parsed.excerpt_es, parsed.coverImage, today, parsed.article_es),
      label: `ES: src/content/blog/es/${parsed.slug_es}.md`,
    },
    {
      filePath: path.join(BLOG_DIR, 'en', `${parsed.slug_en}.md`),
      content: buildMarkdown(parsed.title_en, parsed.excerpt_en, parsed.coverImage, today, parsed.article_en),
      label: `EN: src/content/blog/en/${parsed.slug_en}.md`,
    },
  ];

  for (const { filePath, content, label } of files) {
    if (fs.existsSync(filePath)) {
      throw new Error(`Refusing to overwrite existing blog post: ${filePath}`);
    }
    if (dryRun) {
      console.log(`\n[DRY RUN] Would write ${label}`);
      console.log('---PREVIEW (first 300 chars)---');
      console.log(content.slice(0, 300));
      console.log('...');
    } else {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Written: ${label}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Update blogSlugMap.js
// ---------------------------------------------------------------------------
function appendSlugPair(esSlug, enSlug, dryRun) {
  let content = fs.readFileSync(SLUG_MAP_PATH, 'utf8');

  // Check if already present
  if (content.includes(`'${esSlug}'`) || content.includes(`'${enSlug}'`)) {
    console.warn(`Warning: slug already exists in blogSlugMap.js, skipping update.`);
    return;
  }

  const newEntries = [
    `  '${esSlug}': {`,
    `    es: '${esSlug}',`,
    `    en: '${enSlug}',`,
    `  },`,
    `  '${enSlug}': {`,
    `    es: '${esSlug}',`,
    `    en: '${enSlug}',`,
    `  },`,
  ].join('\n');

  // Insert before the closing brace of the blogSlugMap object
  // The pattern is the last `\n}` in the export object (before the helper functions)
  const insertIndex = content.lastIndexOf('\n}');
  if (insertIndex === -1) {
    console.warn('Warning: could not find insertion point in blogSlugMap.js. Skipping slug map update.');
    return;
  }

  const updated =
    content.slice(0, insertIndex) +
    '\n' +
    newEntries +
    content.slice(insertIndex);

  if (dryRun) {
    console.log('\n[DRY RUN] Would append to src/lib/blogSlugMap.js:');
    console.log(newEntries);
  } else {
    fs.writeFileSync(SLUG_MAP_PATH, updated, 'utf8');
    console.log(`Updated: src/lib/blogSlugMap.js (added ${esSlug} ↔ ${enSlug})`);
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
function printSummary(parsed) {
  console.log('\n✓ Post generated successfully');
  console.log('─'.repeat(60));
  console.log(`ES title:  ${parsed.title_es}`);
  console.log(`EN title:  ${parsed.title_en}`);
  console.log(`ES slug:   ${parsed.slug_es}`);
  console.log(`EN slug:   ${parsed.slug_en}`);
  console.log(`Cover:     ${parsed.coverImage}`);
  console.log('─'.repeat(60));
  console.log(`ES URL: /es/blog/${parsed.slug_es}`);
  console.log(`EN URL: /en/blog/${parsed.slug_en}`);
  console.log('─'.repeat(60));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  const opts = parseArgs();
  const keyword = opts.fromQueue ? getNextFromQueue() : opts.keyword;

  if (opts.dryRun) {
    console.log('\n[DRY RUN MODE] No files will be written.\n');
  }

  let parsed;
  try {
    parsed = await generateArticle(keyword, opts.model);
  } catch (err) {
    console.error(`\nGeneration error: ${err.message}`);
    process.exit(1);
  }

  try {
    validateGeneratedPost(parsed);
  } catch (err) {
    console.error(`\nGeneration error: ${err.message}`);
    process.exit(1);
  }

  try {
    const uniqueSlugs = ensureUniqueSlugPair(parsed.slug_es, parsed.slug_en);
    if (uniqueSlugs.es !== parsed.slug_es || uniqueSlugs.en !== parsed.slug_en) {
      console.log(`Adjusted duplicate slugs to unique values: ${uniqueSlugs.es} ↔ ${uniqueSlugs.en}`);
      parsed.slug_es = uniqueSlugs.es;
      parsed.slug_en = uniqueSlugs.en;
    }
  } catch (err) {
    console.error(`\nGeneration error: ${err.message}`);
    process.exit(1);
  }

  try {
    parsed.coverImage = await generateCoverImage(keyword, parsed.slug_es, process.env.GEMINI_API_KEY, opts.dryRun);
  } catch (err) {
    console.warn(`Warning: cover image generation failed (${err.message}). Post will have no cover image.`);
    parsed.coverImage = '';
  }

  writeMarkdownFiles(parsed, opts.dryRun);
  appendSlugPair(parsed.slug_es, parsed.slug_en, opts.dryRun);

  if (!opts.dryRun && opts.fromQueue) {
    markKeywordDone(keyword);
    console.log(`Marked as done in queue: "${keyword}"`);
  }

  printSummary(parsed);

  if (opts.dryRun) {
    console.log('\n[DRY RUN] Remove --dry-run to actually generate the files.');
  }
})();
