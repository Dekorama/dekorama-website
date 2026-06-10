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
 *   GEMINI_MODEL     Default: gemini-2.5-flash
 *   GEMINI_IMAGE_MODEL Default: gemini-2.5-flash-image
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const matter = require('gray-matter');

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
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { buildSystemPrompt } = require('./prompts/system');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = process.cwd();
const QUEUE_PATH = path.join(ROOT, 'scripts', 'keywords-queue.json');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const SLUG_MAP_PATH = path.join(ROOT, 'src', 'lib', 'blogSlugMap.js');
const PARTNERS_PATH = path.join(ROOT, 'scripts', 'link-partners.json');
const BLOG_CATEGORIES = ['reformas', 'cocinas', 'banos', 'materiales', 'costes'];
const SINGLE_LOCALE_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string', description: 'URL slug in lowercase and hyphens only.' },
    title: { type: 'string', description: 'Full SEO title.' },
    excerpt: { type: 'string', description: 'Excerpt up to 155 characters.' },
    keyAnswer: { type: 'string', description: 'One-sentence direct answer for AI extraction (max 220 chars).' },
    category: {
      type: 'string',
      description: 'One of: reformas, cocinas, banos, materiales, costes.',
      enum: BLOG_CATEGORIES,
    },
    article: { type: 'string', description: 'Markdown article body without frontmatter.' },
  },
  required: ['slug', 'title', 'excerpt', 'keyAnswer', 'article'],
  propertyOrdering: ['slug', 'title', 'excerpt', 'keyAnswer', 'category', 'article'],
};
const BILINGUAL_RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    slug_es: { type: 'string', description: 'Spanish URL slug in lowercase and hyphens only.' },
    slug_en: { type: 'string', description: 'English URL slug in lowercase and hyphens only.' },
    title_es: { type: 'string', description: 'Full Spanish SEO title.' },
    title_en: { type: 'string', description: 'Full English SEO title.' },
    excerpt_es: { type: 'string', description: 'Spanish excerpt up to 155 characters.' },
    excerpt_en: { type: 'string', description: 'English excerpt up to 155 characters.' },
    keyAnswer_es: { type: 'string', description: 'Spanish one-sentence direct answer (max 220 chars).' },
    keyAnswer_en: { type: 'string', description: 'English one-sentence direct answer (max 220 chars).' },
    article_es: { type: 'string', description: 'Spanish markdown article body without frontmatter.' },
    article_en: { type: 'string', description: 'English markdown article body without frontmatter.' },
  },
  required: [
    'slug_es',
    'slug_en',
    'title_es',
    'title_en',
    'excerpt_es',
    'excerpt_en',
    'keyAnswer_es',
    'keyAnswer_en',
    'article_es',
    'article_en',
  ],
  propertyOrdering: [
    'slug_es',
    'slug_en',
    'title_es',
    'title_en',
    'excerpt_es',
    'excerpt_en',
    'keyAnswer_es',
    'keyAnswer_en',
    'article_es',
    'article_en',
  ],
};

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
    noPartner: false,
    validateFile: null,
    validateAll: false,
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--keyword':     opts.keyword = args[++i]; break;
      case '--from-queue':  opts.fromQueue = true; break;
      case '--dry-run':     opts.dryRun = true; break;
      case '--model':       opts.model = args[++i]; break;
      case '--no-partner':  opts.noPartner = true; break;
      case '--validate-file': opts.validateFile = args[++i]; break;
      case '--validate-all': opts.validateAll = true; break;
    }
  }

  const modeCount = [opts.keyword ? 1 : 0, opts.fromQueue ? 1 : 0, opts.validateFile ? 1 : 0, opts.validateAll ? 1 : 0]
    .reduce((sum, count) => sum + count, 0)

  if (modeCount !== 1) {
    console.error('Error: provide --keyword "..." or --from-queue');
    console.error('Examples:');
    console.error('  node scripts/generate-post.js --keyword "suelos porcelanicos Marbella"');
    console.error('  node scripts/generate-post.js --from-queue');
    console.error('  node scripts/generate-post.js --validate-file src/content/blog/es/post.md');
    console.error('  node scripts/generate-post.js --validate-all');
    process.exit(1);
  }

  return opts;
}

// ---------------------------------------------------------------------------
// Partner link helpers
// ---------------------------------------------------------------------------
function loadPartners() {
  if (!fs.existsSync(PARTNERS_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(PARTNERS_PATH, 'utf8')).partners || [];
  } catch {
    return [];
  }
}

/**
 * Picks the active partner whose niches best match the keyword.
 * Falls back to the active partner with the fewest articles linked so far.
 * Returns null if no active partners exist.
 *
 * @param {string} keyword
 * @returns {{ partner: object, outboundLink: object } | null}
 */
function pickPartnerForKeyword(keyword) {
  const partners = loadPartners();
  const active = partners.filter((p) => p.status === 'active' && p.outboundLinks?.length > 0);
  if (active.length === 0) return null;

  const kw = keyword.toLowerCase();

  // Niche hint words so we can score relevance without a heavyweight NLP lib
  const nicheKeywords = {
    'real-estate':      ['inmobili', 'propert', 'piso', 'vivienda', 'casa', 'compra', 'venta', 'alquil', 'invert'],
    'interior-design':  ['diseño', 'design', 'interior', 'deco', 'estilo', 'tendencia', 'aesthetic'],
    'architecture':     ['arquitec', 'architect', 'plano', 'espacio', 'open plan', 'distribuc'],
    'materials-suppliers': ['porcelan', 'tile', 'baldosa', 'revestim', 'azulejo', 'encimera', 'grifo', 'suelo'],
    'expat-lifestyle':  ['expat', 'foreigner', 'extranjero', 'holiday home', 'segunda resid'],
    'home-improvement': ['reform', 'renovat', 'obra', 'presupuest', 'budget', 'mejora'],
  };

  function scorePartner(partner) {
    let score = 0;
    for (const niche of (partner.niches || [])) {
      const hints = nicheKeywords[niche] || [];
      if (hints.some((h) => kw.includes(h))) score += 2;
    }
    // Prefer partners with fewer articles already linked (even distribution)
    score -= (partner.articlesLinked || []).length * 0.1;
    return score;
  }

  const sorted = [...active].sort((a, b) => scorePartner(b) - scorePartner(a));
  const partner = sorted[0];
  // Pick a random outbound link from that partner
  const links = partner.outboundLinks;
  const outboundLink = links[Math.floor(Math.random() * links.length)];

  return { partner, outboundLink };
}

function trackPartnerLink(partnerId, esSlug, enSlug, dryRun) {
  if (!fs.existsSync(PARTNERS_PATH)) return;

  let registry;
  try {
    registry = JSON.parse(fs.readFileSync(PARTNERS_PATH, 'utf8'));
  } catch {
    return;
  }

  const partner = registry.partners.find((p) => p.id === partnerId);
  if (!partner) return;

  if (!Array.isArray(partner.articlesLinked)) partner.articlesLinked = [];

  const entry = { slugEs: esSlug, slugEn: enSlug, linkedAt: new Date().toISOString() };

  if (dryRun) {
    console.log(`[DRY RUN] Would record partner link: ${partnerId} ← ${esSlug} / ${enSlug}`);
    return;
  }

  partner.articlesLinked.push(entry);
  fs.writeFileSync(PARTNERS_PATH, JSON.stringify(registry, null, 2) + '\n');
  console.log(`Tracked partner link: ${partnerId} ← ${esSlug} / ${enSlug}`);
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
function parseSingleLocaleResponse(raw, locale) {
  const parsed = parseGeminiResponse(raw, ['slug', 'title', 'excerpt', 'keyAnswer', 'article']);
  return {
    slug: sanitizeSlug(parsed.slug),
    title: parsed.title,
    excerpt: parsed.excerpt,
    keyAnswer: parsed.keyAnswer,
    article: parsed.article,
    category: parsed.category,
    locale,
  };
}

function buildLocalePrompt(keyword, locale, retryInstruction = '') {
  if (locale === 'es') {
    return `Generate a complete Spanish SEO blog post for this keyword/topic: "${keyword}"

Write only the Spanish version for renovation customers on the Costa del Sol.
Ensure the article body comfortably clears 900 words before returning the JSON.
Keep each FAQ answer below 80 words.
${retryInstruction ? `${retryInstruction}
` : ''}Return the JSON object as specified in your instructions.`;
  }

  return `Generate a complete English SEO blog post for this keyword/topic: "${keyword}"

Write only the English version for expats and international property owners on the Costa del Sol.
Ensure the article body comfortably clears 900 words before returning the JSON.
Keep each FAQ answer below 80 words.
${retryInstruction ? `${retryInstruction}
` : ''}Return the JSON object as specified in your instructions.`;
}

async function generateArticlePart(keyword, model, locale, partnerLink = null, retryInstruction = '') {
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
    systemInstruction: buildSystemPrompt(locale, partnerLink),
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: parseInt(process.env.GEMINI_MAX_OUTPUT_TOKENS || '8192', 10),
      responseMimeType: 'application/json',
      responseSchema: SINGLE_LOCALE_RESPONSE_SCHEMA,
    },
  });

  const prompt = buildLocalePrompt(keyword, locale, retryInstruction);
  console.log(`\nCalling Gemini (${model}) for ${locale.toUpperCase()} keyword: "${keyword}"...`);
  const startTime = Date.now();

  const result = await generativeModel.generateContent(prompt);
  const raw = result.response.text();
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Response received in ${elapsed}s (${raw.length} chars)`);

  return parseSingleLocaleResponse(raw, locale);
}

async function generateArticle(keyword, model, partnerLink = null, retryInstructions = {}) {
  const spanish = await generateArticlePart(keyword, model, 'es', partnerLink, retryInstructions.es || retryInstructions.both || '');
  const english = await generateArticlePart(keyword, model, 'en', partnerLink, retryInstructions.en || retryInstructions.both || '');

  return {
    slug_es: spanish.slug,
    slug_en: english.slug,
    title_es: spanish.title,
    title_en: english.title,
    excerpt_es: spanish.excerpt,
    excerpt_en: english.excerpt,
    keyAnswer_es: spanish.keyAnswer,
    keyAnswer_en: english.keyAnswer,
    article_es: spanish.article,
    article_en: english.article,
    category: spanish.category || english.category,
  };
}

// ---------------------------------------------------------------------------
// Cover image generation via Gemini
// ---------------------------------------------------------------------------
async function generateCoverImage(keyword, slug, apiKey, dryRun) {
  const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'blog');
  const imageModelName = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';

  if (dryRun) {
    console.log('[DRY RUN] Would generate cover image with Gemini.');
    return '/images/blog/placeholder.jpg';
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: imageModelName,
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
function parseGeminiResponse(raw, requiredFields) {
  let parsed;
  const cleaned = stripMarkdownCodeFences(raw);

  try {
    parsed = parsePossiblyMalformedJson(cleaned);
  } catch (err) {
    const extracted = extractFirstJsonObject(cleaned);
    if (!extracted) {
      console.error('\n--- RAW RESPONSE ---\n', raw.slice(0, 500));
      throw new Error(`Gemini response is not valid JSON: ${err.message}`);
    }

    try {
      parsed = parsePossiblyMalformedJson(extracted);
    } catch {
      parsed = extractStructuredResponseFields(extracted, requiredFields);
    }
  }

  // Validate required fields
  for (const field of requiredFields) {
    if (!parsed[field]) {
      throw new Error(`Gemini response is missing required field: "${field}"`);
    }
  }

  return parsed;
}

function extractStructuredResponseFields(input, requiredFields) {
  const extracted = {};

  for (let index = 0; index < requiredFields.length; index += 1) {
    const field = requiredFields[index];
    const nextField = requiredFields[index + 1] || null;
    const marker = `"${field}"`;
    const fieldIndex = input.indexOf(marker);

    if (fieldIndex === -1) {
      console.error('\n--- RAW RESPONSE ---\n', input.slice(0, 500));
      throw new Error(`Could not recover required field "${field}" from Gemini response.`);
    }

    const colonIndex = input.indexOf(':', fieldIndex + marker.length);
    if (colonIndex === -1) {
      throw new Error(`Could not recover field "${field}" because the separator is missing.`);
    }

    let valueStart = colonIndex + 1;
    while (valueStart < input.length && /\s/.test(input[valueStart])) {
      valueStart += 1;
    }

    if (input[valueStart] !== '"') {
      throw new Error(`Could not recover field "${field}" because the value is not a string.`);
    }

    valueStart += 1;
    const rawValue = nextField
      ? extractFieldValueUntilNextMarker(input, valueStart, nextField)
      : extractLastFieldValue(input, valueStart);

    extracted[field] = decodeJsonLikeString(rawValue);
  }

  return extracted;
}

function extractFieldValueUntilNextMarker(input, valueStart, nextField) {
  const nextMarkerPattern = new RegExp(`",\\s*"${escapeRegExp(nextField)}"\\s*:`, 'g');
  nextMarkerPattern.lastIndex = valueStart;
  const match = nextMarkerPattern.exec(input);

  if (!match) {
    throw new Error(`Could not locate the boundary for field before "${nextField}".`);
  }

  return input.slice(valueStart, match.index);
}

function extractLastFieldValue(input, valueStart) {
  let value = input.slice(valueStart).trim();
  value = value.replace(/\}\s*$/, '').trimEnd();

  if (value.endsWith('"')) {
    value = value.slice(0, -1);
  }

  return value;
}

function decodeJsonLikeString(input) {
  let output = '';

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (char !== '\\') {
      output += char;
      continue;
    }

    const next = input[index + 1];
    if (next === undefined) {
      output += '\\';
      continue;
    }

    if (next === 'n') {
      output += '\n';
      index += 1;
      continue;
    }

    if (next === 'r') {
      output += '\r';
      index += 1;
      continue;
    }

    if (next === 't') {
      output += '\t';
      index += 1;
      continue;
    }

    if (next === '"' || next === '\\' || next === '/') {
      output += next;
      index += 1;
      continue;
    }

    if (next === 'u' && /^[0-9a-fA-F]{4}$/.test(input.slice(index + 2, index + 6))) {
      output += String.fromCharCode(parseInt(input.slice(index + 2, index + 6), 16));
      index += 5;
      continue;
    }

    output += next;
    index += 1;
  }

  return output;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripMarkdownCodeFences(raw) {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  return cleaned;
}

function parsePossiblyMalformedJson(input) {
  try {
    return JSON.parse(input);
  } catch (initialError) {
    const sanitized = escapeJsonControlCharactersInStrings(input);
    if (sanitized === input) {
      throw initialError;
    }

    try {
      return JSON.parse(sanitized);
    } catch {
      throw initialError;
    }
  }
}

function escapeJsonControlCharactersInStrings(input) {
  let output = '';
  let inString = false;
  let escaping = false;

  for (const char of input) {
    if (inString) {
      if (escaping) {
        output += char;
        escaping = false;
        continue;
      }

      if (char === '\\') {
        output += char;
        escaping = true;
        continue;
      }

      if (char === '"') {
        output += char;
        inString = false;
        continue;
      }

      if (char === '\n') {
        output += '\\n';
        continue;
      }

      if (char === '\r') {
        output += '\\r';
        continue;
      }

      if (char === '\t') {
        output += '\\t';
        continue;
      }

      if (char.charCodeAt(0) < 0x20) {
        output += `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`;
        continue;
      }

      output += char;
      continue;
    }

    if (char === '"') {
      inString = true;
    }

    output += char;
  }

  return output;
}

function extractFirstJsonObject(input) {
  const startIndex = input.indexOf('{');
  if (startIndex === -1) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaping = false;

  for (let index = startIndex; index < input.length; index += 1) {
    const char = input[index];

    if (inString) {
      if (escaping) {
        escaping = false;
      } else if (char === '\\') {
        escaping = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') {
      depth += 1;
      continue;
    }

    if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return input.slice(startIndex, index + 1);
      }
    }
  }

  return input.slice(startIndex);
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

const FAQ_HEADING_ES = /^##\s+Preguntas\s+frecuentes\b/im
const FAQ_HEADING_EN = /^##\s+Frequently\s+asked\s+questions\b/im
const QUICK_ANSWER_ES = /^##\s+Respuesta\s+r[aá]pida\b/im
const QUICK_ANSWER_EN = /^##\s+Quick\s+answer\b/im
const SPANISH_QUESTION_PREFIX = /^(?:¿|c[oó]mo\b|cu[aá]l\b|cu[aá]les\b|cu[aá]ndo\b|cu[aá]nto\b|cu[aá]nta\b|cu[aá]ntos\b|cu[aá]ntas\b|d[oó]nde\b|por\s+qu[eé]\b|qu[eé]\b|qui[eé]n\b|merece\s+la\s+pena\b|conviene\b|se\s+puede\b|vale\s+la\s+pena\b)/i
const ENGLISH_QUESTION_PREFIX = /^(?:how\b|what\b|when\b|where\b|which\b|who\b|why\b|is\b|are\b|can\b|should\b|do\b|does\b|will\b)/i
const KEY_ANSWER_MAX_LENGTH = 220
const FAQ_ANSWER_MAX_WORDS = 80
const ARTICLE_MIN_WORDS = 900

const BODY_EXPANSION_BLOCKS = {
  es: [
    '### Checklist para pedir presupuesto con criterio\n\n- Pide mediciones en obra, no una cifra orientativa por WhatsApp.\n- Confirma si el precio incluye retirada de escombros, licencias y protección de zonas comunes.\n- Revisa calidades concretas: formato de revestimiento, grifería, plato de ducha, encimera o carpintería.\n- Aclara plazos reales de suministro para evitar retrasos cuando llegue el momento de montar.\n\nCuando esta información aparece desglosada desde el principio, comparar presupuestos deja de ser una lotería. También resulta más fácil detectar si una propuesta está demasiado ajustada porque omite partidas incómodas que luego reaparecen como extras.',
    '### Qué suele encarecer o retrasar la obra\n\nLas desviaciones aparecen cuando hay que corregir instalaciones antiguas, nivelar soportes, cambiar la distribución o esperar materiales con entrega lenta. Si el presupuesto separa mano de obra, materiales y partidas imprevistas, comparar opciones resulta mucho más claro y evita sorpresas a mitad del proyecto.\n\nEn pisos antiguos de la Costa del Sol también influye el estado real de bajantes, tabiquería, carpinterías y suelos existentes. Por eso una visita técnica previa suele valer mucho más que una estimación cerrada sin revisar la vivienda con detalle.',
    '### Cómo reducir riesgos antes de empezar\n\nAntes de cerrar la obra, conviene dejar decididos acabados, medidas finales y puntos de electricidad o fontanería. También ayuda revisar accesos, horarios de comunidad y protección del inmueble. Esa preparación previa suele ahorrar incidencias, visitas extra y cambios improvisados cuando la reforma ya está en marcha.\n\nSi además se coordinan pedidos, fechas de entrega y secuencia de oficios antes del arranque, el proyecto gana estabilidad. No garantiza que no aparezca ningún imprevisto, pero sí reduce bastante los parones y las decisiones apresuradas en obra.',
    '### Cómo comparar dos propuestas sin fijarte solo en el precio\n\nUna oferta puede parecer más barata y terminar siendo más cara si deja fuera remates, nivelaciones, transporte, protección del inmueble o montaje de determinados acabados. Lo útil es revisar qué partidas están incluidas, qué marcas o gamas se han presupuestado y qué margen real existe para cambios una vez empezada la obra.\n\nCuando dos presupuestos usan calidades distintas, la cifra final deja de ser comparable. En ese caso conviene pedir la misma base de materiales y el mismo alcance para valorar con criterio.',
    '### Materiales y decisiones que conviene cerrar pronto\n\nEn una reforma integral, retrasar la elección de revestimientos, sanitarios, mobiliario, iluminación o encimeras suele bloquear oficios posteriores. Elegir a tiempo no significa decidir deprisa, sino ordenar prioridades para que mediciones, pedidos y montaje encajen sin rehacer trabajo ya ejecutado.\n\nEn Dekorama solemos recomendar cerrar primero lo que afecta a instalaciones, pasos y medidas definitivas. Después ya es más fácil afinar detalles estéticos sin comprometer el calendario general.',
  ],
  en: [
    '### Budget checklist before you compare quotes\n\n- Ask for a site measurement instead of relying on a rough message-based estimate.\n- Check whether waste removal, permits and communal-area protection are included.\n- Review exact specifications for tiles, fittings, shower trays, worktops or cabinetry.\n- Confirm realistic supply times so the installation phase does not stall halfway through.\n\nOnce those points are clear, comparing two proposals becomes far more reliable. It also becomes easier to spot a cheap-looking quote that is only cheaper because several awkward but necessary items have been left out.',
    '### What usually pushes the cost or timeline up\n\nBudgets tend to grow when old plumbing or electrics need replacing, walls or floors require levelling, layouts change or key materials have long lead times. Quotes are much easier to compare when labour, materials and contingency items are separated clearly instead of bundled into vague allowances.\n\nIn older Costa del Sol flats, the real condition of drains, partitions, existing flooring and joinery can also change the final scope. That is why an on-site technical review is far more useful than a fixed number produced without seeing the property properly.',
    '### How to reduce friction before work starts\n\nIt helps to lock in finishes, final measurements and service points before the team starts on site. Access restrictions, community rules and property protection should also be agreed in advance. That preparation usually saves rework, avoids rushed decisions and keeps the schedule more predictable.\n\nIf orders, delivery dates and the sequence of trades are coordinated before the start date, the project usually runs much more smoothly. It does not remove every risk, but it does cut down avoidable stoppages and last-minute changes.',
    '### How to compare two quotes beyond the headline price\n\nOne proposal can look cheaper and still cost more in the end if it leaves out finishing work, levelling, transport, property protection or the installation of key materials. The sensible comparison is to check scope, material grade and how much flexibility exists once work has started.\n\nIf two quotes are based on different specifications, the totals are not truly comparable. Ask both sides to price the same baseline before making a decision.',
    '### Materials and decisions worth fixing early\n\nOn a full renovation, delaying choices on surfaces, sanitaryware, cabinetry, lighting or worktops often holds up later trades. Choosing early does not mean rushing. It means setting priorities so measurements, orders and installation fit together without undoing completed work.\n\nWe usually recommend fixing the decisions that affect services, clearances and final dimensions first. Once that framework is stable, aesthetic choices are much easier to refine without disrupting the overall programme.',
  ],
}

function getFaqSection(body, locale) {
  const faqRe = locale === 'es' ? FAQ_HEADING_ES : FAQ_HEADING_EN
  const sections = body.split(/^(?=##\s)/m)

  for (const section of sections) {
    if (!faqRe.test(section.split('\n')[0])) continue
    return section.trim()
  }

  return ''
}

function countFaqItems(body, locale) {
  const faqSection = getFaqSection(body, locale)
  return (faqSection.match(/^###\s+/gm) || []).length
}

function getFaqAnswerWordCounts(body, locale) {
  const faqSection = getFaqSection(body, locale)

  if (!faqSection) return []

  return faqSection
    .split(/^###\s+/m)
    .slice(1)
    .map((item) => item.split('\n').slice(1).join(' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((answer) => countWords(answer))
}

function getH2Headings(body) {
  return (body.match(/^##\s+.+$/gm) || []).map((heading) => heading.replace(/^##\s+/, '').trim())
}

function isQuestionStyleHeading(heading, locale) {
  if (!heading) return false

  if (heading.includes('?')) return true

  return locale === 'es'
    ? SPANISH_QUESTION_PREFIX.test(heading)
    : ENGLISH_QUESTION_PREFIX.test(heading)
}

function countQuestionStyleH2s(body, locale) {
  const quickAnswerRe = locale === 'es' ? QUICK_ANSWER_ES : QUICK_ANSWER_EN
  const faqRe = locale === 'es' ? FAQ_HEADING_ES : FAQ_HEADING_EN

  return getH2Headings(body)
    .filter((heading) => !quickAnswerRe.test(`## ${heading}`) && !faqRe.test(`## ${heading}`))
    .filter((heading) => isQuestionStyleHeading(heading, locale))
    .length
}

function isFaqLastH2Section(body, locale) {
  const headings = body.match(/^##\s+.+$/gm) || []
  const lastHeading = headings.at(-1) || ''
  const faqRe = locale === 'es' ? FAQ_HEADING_ES : FAQ_HEADING_EN

  return faqRe.test(lastHeading)
}

function buildFaqSection(keyword, locale) {
  if (locale === 'es') {
    return [
      '## Preguntas frecuentes',
      '',
      `### ¿Cuánto cuesta ${keyword}?`,
      'El coste depende del tamaño del espacio, la calidad de los materiales y el alcance de la obra. La mejor forma de acertar es pedir una visita y un presupuesto detallado antes de comparar opciones.',
      '',
      `### ¿Qué materiales suelen funcionar mejor para ${keyword}?`,
      'En la mayoría de proyectos conviene priorizar materiales resistentes, fáciles de mantener y adecuados al uso diario. En Dekorama solemos valorar porcelánico, encimeras compactas, grifería fiable y acabados que soporten bien la humedad y el desgaste.',
      '',
      `### ¿Cuánto tiempo se tarda en completar ${keyword}?`,
      'El plazo varía según la obra previa, la disponibilidad de materiales y si hay que tocar instalaciones. En proyectos bien planificados, definir acabados y mediciones antes de empezar ayuda a evitar retrasos innecesarios.',
      '',
      '### ¿Trabajáis en toda la Costa del Sol?',
      'Sí. Nuestro showroom está en Benalmádena y ejecutamos proyectos en Marbella, Fuengirola, Estepona, Torremolinos y alrededores.',
    ].join('\n');
  }

  return [
    '## Frequently asked questions',
    '',
    `### How much does ${keyword} cost?`,
    'The final cost depends on the size of the project, the specification level and whether plumbing, electrics or layout changes are involved. A site visit and itemised quote are the safest way to compare options properly.',
    '',
    `### Which materials work best for ${keyword}?`,
    'In most cases, durable low-maintenance materials are the best fit. We usually look at porcelain surfaces, reliable fittings, practical worktops and finishes that hold up well to daily use and cleaning.',
    '',
    `### How long does ${keyword} usually take?`,
    'That depends on the scope, the condition of the property and material lead times. Projects move faster when layouts, finishes and measurements are agreed before work starts on site.',
    '',
    '### Do you work across the Costa del Sol?',
    'Yes. We are based in Benalmádena and carry out projects in Marbella, Fuengirola, Estepona, Torremolinos and nearby areas.',
  ].join('\n');
}

function buildQuickAnswerSection(keyword, locale) {
  if (locale === 'es') {
    return [
      '## Respuesta rápida',
      '',
      `Para ${keyword} en la Costa del Sol, el precio y el plazo dependen del tamaño del espacio, los materiales y si cambias instalaciones. En Dekorama (Benalmádena) te damos presupuesto cerrado tras visita y mediciones.`,
    ].join('\n');
  }

  return [
    '## Quick answer',
    '',
    `For ${keyword} on the Costa del Sol, cost and timeline depend on room size, specification and whether plumbing or layout changes are needed. Dekorama in Benalmádena provides a fixed quote after a site visit.`,
  ].join('\n');
}

function trimToWordLimit(text, maxWords) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (!normalized) return normalized

  const words = normalized.split(' ')
  if (words.length <= maxWords) return normalized

  const trimmed = words.slice(0, maxWords).join(' ').replace(/[,:;\-\s]+$/, '')
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

function trimFaqAnswers(body, locale) {
  const faqHeading = locale === 'es' ? '## Preguntas frecuentes' : '## Frequently asked questions'
  const faqRe = locale === 'es' ? FAQ_HEADING_ES : FAQ_HEADING_EN
  const faqStart = body.search(faqRe)

  if (faqStart === -1) return body

  const beforeFaq = body.slice(0, faqStart).trimEnd()
  const faqSection = body.slice(faqStart).trim()
  const lines = faqSection.split('\n')
  const rebuilt = []
  let index = 0

  while (index < lines.length && !/^###\s+/.test(lines[index])) {
    rebuilt.push(lines[index])
    index += 1
  }

  while (index < lines.length) {
    const headingLine = lines[index]
    if (!/^###\s+/.test(headingLine)) {
      rebuilt.push(lines[index])
      index += 1
      continue
    }

    rebuilt.push(headingLine)
    index += 1

    const answerLines = []
    while (index < lines.length && !/^###\s+/.test(lines[index])) {
      answerLines.push(lines[index])
      index += 1
    }

    const answer = answerLines.join(' ').replace(/\s+/g, ' ').trim()
    rebuilt.push(trimToWordLimit(answer, FAQ_ANSWER_MAX_WORDS))
    if (index < lines.length) rebuilt.push('')
  }

  const normalizedFaq = rebuilt.join('\n').replace(/\n{3,}/g, '\n\n').trim()
  return beforeFaq ? `${beforeFaq}\n\n${normalizedFaq}\n` : `${faqHeading}\n\n${normalizedFaq.replace(/^##\s+.+\n\n?/, '')}\n`
}

function insertBeforeFaq(body, block, locale) {
  const faqRe = locale === 'es' ? FAQ_HEADING_ES : FAQ_HEADING_EN
  const faqStart = body.search(faqRe)

  if (faqStart === -1) {
    return `${body.trim()}\n\n${block.trim()}\n`
  }

  const beforeFaq = body.slice(0, faqStart).trimEnd()
  const faqSection = body.slice(faqStart).trimStart()
  return `${beforeFaq}\n\n${block.trim()}\n\n${faqSection}`
}

function expandArticleToMinimumWords(body, locale) {
  let expanded = body.trim()
  const blocks = BODY_EXPANSION_BLOCKS[locale] || []
  let blockIndex = 0
  let cycle = 0

  while (countWords(expanded) < ARTICLE_MIN_WORDS && blocks.length > 0 && cycle < 3) {
    const block = blocks[blockIndex]
    expanded = insertBeforeFaq(expanded, block, locale)
    blockIndex += 1

    if (blockIndex >= blocks.length) {
      blockIndex = 0
      cycle += 1
    }
  }

  return expanded
}

// ---------------------------------------------------------------------------
// Deterministic structural repair helpers
// ---------------------------------------------------------------------------

/**
 * Remove any stray H1 heading (the validator rejects these outright).
 */
function stripH1(body) {
  return body.replace(/^#\s+.+$/m, '').replace(/\n{3,}/g, '\n\n').trim()
}

/**
 * If the FAQ section has fewer than 3 items, inject extras from a built-in bank.
 * Skips any heading whose first 20 chars already appear in the FAQ section.
 */
function ensureMinFaqItems(body, keyword, locale) {
  const needed = 3 - countFaqItems(body, locale)
  if (needed <= 0) return body

  const faqRe = locale === 'es' ? FAQ_HEADING_ES : FAQ_HEADING_EN
  const faqStart = body.search(faqRe)
  if (faqStart === -1) return body

  const afterFaqHeading = body.slice(faqStart)
  const firstNewline = afterFaqHeading.indexOf('\n')
  if (firstNewline === -1) return body

  const bodyAfterFaqFirstLine = afterFaqHeading.slice(firstNewline + 1)
  const nextH2Offset = bodyAfterFaqFirstLine.search(/^##\s+/m)
  const faqEndAbsolute = nextH2Offset === -1
    ? body.length
    : faqStart + firstNewline + 1 + nextH2Offset

  const faqSection = body.slice(faqStart, faqEndAbsolute).toLowerCase()

  const extraItems = locale === 'es'
    ? [
        `### ¿Cuánto cuesta ${keyword}?\nEl coste depende del tamaño del espacio, la calidad de los materiales y el alcance de la obra. La mejor forma de acertar es pedir una visita y un presupuesto detallado antes de comparar opciones.`,
        `### ¿Cuánto tiempo se tarda?\nEl plazo varía según la obra previa, la disponibilidad de materiales y si hay que tocar instalaciones. En proyectos bien planificados, definir acabados y mediciones antes de empezar ayuda a evitar retrasos.`,
        `### ¿Trabajáis en toda la Costa del Sol?\nSí. Nuestro showroom está en Benalmádena y ejecutamos proyectos en Marbella, Fuengirola, Estepona, Torremolinos y alrededores.`,
        `### ¿Qué materiales recomendáis?\nConviene priorizar materiales resistentes y fáciles de mantener. En Dekorama solemos valorar porcelánico, grifería fiable y acabados que soporten bien la humedad y el desgaste.`,
      ]
    : [
        `### How much does ${keyword} cost?\nThe final cost depends on the size of the project, the specification level and whether plumbing, electrics or layout changes are involved. A site visit and itemised quote are the safest way to compare options.`,
        `### How long does the work take?\nThat depends on the scope, the condition of the property and material lead times. Projects move faster when layouts, finishes and measurements are agreed before work starts on site.`,
        `### Do you work across the Costa del Sol?\nYes. We are based in Benalmádena and carry out projects in Marbella, Fuengirola, Estepona, Torremolinos and nearby areas.`,
        `### Which materials do you recommend?\nIn most cases, durable low-maintenance materials are the best fit. We usually look at porcelain surfaces, reliable fittings and finishes that hold up well to daily use and cleaning.`,
      ]

  const additions = extraItems
    .filter((item) => {
      const key = item.split('\n')[0].replace(/^###\s+/, '').toLowerCase().slice(0, 20)
      return !faqSection.includes(key)
    })
    .slice(0, needed)
    .join('\n\n')

  if (!additions) return body

  const beforeEnd = body.slice(0, faqEndAbsolute).trimEnd()
  const afterEnd = body.slice(faqEndAbsolute)
  return `${beforeEnd}\n\n${additions}\n${afterEnd}`
}

/**
 * If the FAQ is not the last H2, extract it and move it to the end.
 */
function ensureFaqIsLast(body, locale) {
  if (isFaqLastH2Section(body, locale)) return body

  const faqRe = locale === 'es' ? FAQ_HEADING_ES : FAQ_HEADING_EN
  const faqStart = body.search(faqRe)
  if (faqStart === -1) return body

  const afterFaqHeading = body.slice(faqStart)
  const firstNewline = afterFaqHeading.indexOf('\n')
  if (firstNewline === -1) return body

  const bodyAfterFaqFirstLine = afterFaqHeading.slice(firstNewline + 1)
  const nextH2Offset = bodyAfterFaqFirstLine.search(/^##\s+/m)

  // No H2 after the FAQ content — it's already last (shouldn't reach here but guard anyway)
  if (nextH2Offset === -1) return body

  const faqEndRelative = firstNewline + 1 + nextH2Offset
  const faqSection = afterFaqHeading.slice(0, faqEndRelative).trimEnd()
  const afterFaqSection = afterFaqHeading.slice(faqEndRelative).trim()
  const beforeFaq = body.slice(0, faqStart).trimEnd()

  return `${beforeFaq}\n\n${afterFaqSection}\n\n${faqSection}\n`
}

/**
 * Ensure at least 2 question-shaped H2 headings (excluding Quick Answer and FAQ).
 * Inserts keyword-specific question H2 blocks before the FAQ.
 */
function ensureQuestionH2s(body, keyword, locale) {
  const needed = 2 - countQuestionStyleH2s(body, locale)
  if (needed <= 0) return body

  const questionBlocks = locale === 'es'
    ? [
        { heading: `## ¿Cuánto cuesta ${keyword}?`, content: `El precio final depende del tamaño, los materiales y si la obra incluye cambios en instalaciones. En la Costa del Sol, lo más útil es pedir un presupuesto con mediciones reales.\n\nEn Dekorama ofrecemos visita técnica y presupuesto detallado sin compromiso para que puedas comparar con criterio.` },
        { heading: `## ¿Cuánto tiempo se tarda en completar ${keyword}?`, content: `El plazo depende del alcance de la obra, el estado previo del inmueble y la disponibilidad de los materiales. Definir acabados y mediciones antes de empezar ayuda a evitar parones una vez que la reforma está en marcha.` },
        { heading: `## ¿Cómo elegir la mejor opción para ${keyword}?`, content: `La elección depende del uso, el presupuesto y la estética que buscas. En general, conviene priorizar durabilidad frente a tendencia, y confirmar que el material elegido funciona bien con las condiciones reales del espacio.` },
      ]
    : [
        { heading: `## How much does ${keyword} cost?`, content: `The final price depends on the size, the material specification and whether the project involves changes to plumbing or electrics. On the Costa del Sol, the most useful starting point is a quote based on actual site measurements.\n\nDekorama provides a technical visit and itemised quote so you can compare options properly.` },
        { heading: `## How long does ${keyword} take to complete?`, content: `The timeline depends on the scope of work, the current condition of the property and material availability. Fixing finishes and measurements before work starts avoids unnecessary stoppages once the renovation is under way.` },
        { heading: `## How do you choose the right option for ${keyword}?`, content: `The choice depends on how the space is used, the budget and the finish you want to achieve. As a rule, durability is more important than following trends, and the material should suit the actual conditions of the space.` },
      ]

  const existingHeadings = getH2Headings(body).map((h) => h.toLowerCase())
  let modified = body
  let added = 0

  for (const { heading, content } of questionBlocks) {
    if (added >= needed) break
    const key = heading.replace(/^##\s+/, '').toLowerCase().slice(0, 18)
    if (existingHeadings.some((h) => h.includes(key))) continue
    modified = insertBeforeFaq(modified, `${heading}\n\n${content}`, locale)
    added += 1
  }

  return modified
}

/**
 * Ensure at least 5 H2 sections total.
 * Inserts generic on-topic H2 blocks before the FAQ until the minimum is met.
 */
function ensureMinH2Count(body, keyword, locale) {
  const MIN_H2 = 5
  const current = (body.match(/^##\s+/gm) || []).length
  const needed = MIN_H2 - current
  if (needed <= 0) return body

  const fillerBlocks = locale === 'es'
    ? [
        `## Qué tener en cuenta antes de decidir\n\nAntes de elegir acabados, materiales o instalaciones para ${keyword}, conviene revisar el estado actual del espacio, el presupuesto disponible y los plazos reales. Esa combinación define qué opciones son viables y cuáles no encajan con el proyecto concreto.\n\nEn Dekorama te ayudamos a valorar esas variables sin compromiso antes de cerrar nada.`,
        `## Cómo planificar bien el proyecto\n\nUna planificación sólida empieza por cerrar mediciones, acabados e instalaciones antes de que llegue el equipo de obra. Cuando eso está decidido, los pedidos se ajustan a los plazos de suministro y la secuencia de trabajos fluye sin interrupciones.\n\nLos proyectos que más se desvían de plazo y presupuesto suelen ser los que improvisan decisiones importantes una vez iniciada la obra.`,
        `## Opciones y tendencias actuales\n\nEn reformas de vivienda en la Costa del Sol, las tendencias van hacia acabados neutros y duraderos, formatos grandes en porcelánico y griferías de línea limpia. La clave no es seguir tendencias, sino elegir lo que aguanta bien con el uso habitual y encaja con el inmueble real.`,
      ]
    : [
        `## Key factors before you decide\n\nBefore choosing finishes, materials or fittings for ${keyword}, it helps to review the current condition of the space, the available budget and realistic lead times. That combination determines which options are genuinely viable for the project.\n\nAt Dekorama we help you assess those variables before anything is confirmed.`,
        `## How to plan the project well\n\nSolid planning starts with locking in measurements, finishes and service points before the trade team arrives. Once those decisions are made, orders can be timed to match supply lead times and the sequence of work runs smoothly.\n\nProjects that run over time and budget are usually the ones where major decisions were improvised after work had already started.`,
        `## Current trends and popular options\n\nIn Costa del Sol home renovations, the current direction is towards neutral durable finishes, large-format porcelain and clean-line fittings. The real aim is not to follow trends but to choose materials that hold up well under daily use and suit the actual property.`,
      ]

  const existingHeadings = getH2Headings(body).map((h) => h.toLowerCase())
  let modified = body

  for (let i = 0; i < Math.min(needed, fillerBlocks.length); i += 1) {
    const headingText = fillerBlocks[i].split('\n')[0].replace(/^##\s+/, '').toLowerCase().slice(0, 18)
    if (existingHeadings.some((h) => h.includes(headingText))) continue
    modified = insertBeforeFaq(modified, fillerBlocks[i], locale)
  }

  return modified
}

function repairArticleBody(body, keyword, locale) {
  let repaired = replaceMarkdownTables(body)
  repaired = stripH1(repaired)
  repaired = ensureQuickAnswerSection(repaired, keyword, locale)
  repaired = ensureFaqSection(repaired, keyword, locale)
  repaired = ensureMinFaqItems(repaired, keyword, locale)
  repaired = ensureFaqIsLast(repaired, locale)
  repaired = ensureQuestionH2s(repaired, keyword, locale)
  repaired = ensureMinH2Count(repaired, keyword, locale)
  repaired = ensureInternalLinks(repaired, locale)
  repaired = trimFaqAnswers(repaired, locale)
  repaired = expandArticleToMinimumWords(repaired, locale)
  return repaired.trim()
}

function ensureQuickAnswerSection(body, keyword, locale) {
  const hasQuick = locale === 'es' ? QUICK_ANSWER_ES.test(body) : QUICK_ANSWER_EN.test(body)
  if (hasQuick) return body

  const paragraphs = body.trim().split(/\n\n+/)
  const introEnd = Math.min(2, paragraphs.length)
  const intro = paragraphs.slice(0, introEnd).join('\n\n')
  const rest = paragraphs.slice(introEnd).join('\n\n')
  return `${intro}\n\n${buildQuickAnswerSection(keyword, locale)}\n\n${rest}`.trim()
}

function ensureFaqSection(body, keyword, locale) {
  const hasFaq = locale === 'es' ? FAQ_HEADING_ES.test(body) : FAQ_HEADING_EN.test(body)

  if (hasFaq) return body;

  return `${body.trim()}\n\n${buildFaqSection(keyword, locale)}\n`;
}

function buildInternalLinksSection(locale) {
  if (locale === 'es') {
    return [
      '## Servicios y materiales relacionados',
      '',
      '- [Reformas integrales en la Costa del Sol](/es/reformas-integrales)',
      '- [Cocinas a medida](/es/cocinas-a-medida)',
      '- [Baños completos](/es/banos-completos)',
    ].join('\n');
  }

  return [
    '## Related services and materials',
    '',
    '- [Full home renovations on the Costa del Sol](/en/reformas-integrales)',
    '- [Custom kitchens](/en/cocinas-a-medida)',
    '- [Complete bathroom renovations](/en/banos-completos)',
  ].join('\n');
}

function ensureInternalLinks(body, locale) {
  const linkCount = locale === 'es'
    ? (body.match(/\]\(\/es\//g) || []).length
    : (body.match(/\]\(\/en\//g) || []).length;

  if (linkCount >= 2) return body;

  const faqRe = locale === 'es' ? FAQ_HEADING_ES : FAQ_HEADING_EN
  const faqStart = body.search(faqRe)

  if (faqStart !== -1) {
    const beforeFaq = body.slice(0, faqStart).trimEnd()
    const faqSection = body.slice(faqStart).trimStart()
    return `${beforeFaq}\n\n${buildInternalLinksSection(locale)}\n\n${faqSection}`
  }

  return `${body.trim()}\n\n${buildInternalLinksSection(locale)}\n`;
}

function splitMarkdownTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
    .filter((cell) => cell.length > 0);
}

function isMarkdownTableSeparator(line) {
  const trimmed = line.trim();
  return /^\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(trimmed);
}

function stripInlineMarkdown(text) {
  return text.replace(/\*\*/g, '').replace(/__/g, '').trim();
}

function convertMarkdownTableBlock(block) {
  const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
  if (lines.length < 3 || !isMarkdownTableSeparator(lines[1])) {
    return block;
  }

  const headers = splitMarkdownTableRow(lines[0]).map(stripInlineMarkdown);
  const rows = lines.slice(2).map(splitMarkdownTableRow).filter((row) => row.length > 0);

  if (headers.length < 2 || rows.length === 0) {
    return block;
  }

  const sections = rows.map((row) => {
    const title = stripInlineMarkdown(row[0] || headers[0] || 'Option');
    const bodyLines = [];

    for (let index = 1; index < headers.length; index += 1) {
      const label = headers[index];
      const value = row[index];
      if (label && value) {
        bodyLines.push(`**${label}:** ${value}`);
      }
    }

    if (bodyLines.length === 0 && row[1]) {
      bodyLines.push(row[1]);
    }

    return [`### ${title}`, '', ...bodyLines].join('\n');
  });

  return sections.join('\n\n');
}

function replaceMarkdownTables(body) {
  return body.replace(/(^\|.+\|\s*\n^\|?(?:\s*:?-{3,}:?\s*\|)+\s*\n(?:^\|.*\|\s*(?:\n|$))+)/gm, (match) => {
    return convertMarkdownTableBlock(match);
  });
}

function containsMarkdownTable(body) {
  return /(^\|.+\|\s*\n^\|?(?:\s*:?-{3,}:?\s*\|)+\s*\n(?:^\|.*\|\s*(?:\n|$))+)/gm.test(body);
}

function inferCategoryFromKeyword(keyword) {
  const normalized = keyword.toLowerCase();

  if (/cuanto cuesta|precio|presupuesto|coste|cost\b|budget/.test(normalized)) return 'costes';
  if (/cocina|kitchen|isla|encimera|campana/.test(normalized)) return 'cocinas';
  if (/bano|baño|ducha|shower|mampara|inodoro|griferia de bano|grifería de baño/.test(normalized)) {
    return 'banos';
  }
  if (/porcelanico|porcelánico|tarima|azulejo|tile|gres|griferia|plato de ducha|iluminacion|material/.test(normalized)) {
    return 'materiales';
  }
  return 'reformas';
}

function normalizeCategory(value, keyword) {
  if (typeof value === 'string' && BLOG_CATEGORIES.includes(value)) return value;
  return inferCategoryFromKeyword(keyword);
}

function normalizeGeneratedPost(parsed, keyword) {
  parsed.article_es = repairArticleBody(parsed.article_es, keyword, 'es');
  parsed.article_en = repairArticleBody(parsed.article_en, keyword, 'en');
  if (!parsed.keyAnswer_es?.trim()) {
    parsed.keyAnswer_es = parsed.excerpt_es || parsed.title_es
  }
  if (!parsed.keyAnswer_en?.trim()) {
    parsed.keyAnswer_en = parsed.excerpt_en || parsed.title_en
  }
  parsed.category = normalizeCategory(parsed.category, keyword);
  return parsed;
}

function validateArticleBody(body, locale) {
  const label = locale === 'es' ? 'Spanish' : 'English';
  const wordCount = countWords(body);
  const h2Count = (body.match(/^##\s+/gm) || []).length;
  const hasFaq = locale === 'es' ? FAQ_HEADING_ES.test(body) : FAQ_HEADING_EN.test(body)
  const hasQuickAnswer = locale === 'es' ? QUICK_ANSWER_ES.test(body) : QUICK_ANSWER_EN.test(body)
  const faqCount = countFaqItems(body, locale)
  const faqAnswerWordCounts = getFaqAnswerWordCounts(body, locale)
  const questionStyleH2Count = countQuestionStyleH2s(body, locale)
  const internalLinks = locale === 'es'
    ? (body.match(/\]\(\/es\//g) || []).length
    : (body.match(/\]\(\/en\//g) || []).length;

  if (/^#\s+/m.test(body)) {
    throw new Error(`${label} article must not include an H1 heading.`);
  }

  if (wordCount < ARTICLE_MIN_WORDS) {
    throw new Error(`${label} article is too short (${wordCount} words). Minimum is ${ARTICLE_MIN_WORDS}.`);
  }

  if (h2Count < 5) {
    throw new Error(`${label} article must contain at least 5 H2 sections.`);
  }

  if (internalLinks < 2) {
    throw new Error(`${label} article must include at least 2 internal links.`);
  }

  if (!hasQuickAnswer) {
    throw new Error(`${label} article must include a "## Respuesta rápida" or "## Quick answer" section.`);
  }

  if (questionStyleH2Count < 2) {
    throw new Error(`${label} article must include at least 2 question-shaped H2 headings.`)
  }

  if (!hasFaq) {
    throw new Error(`${label} article must end with a FAQ section.`);
  }

  if (!isFaqLastH2Section(body, locale)) {
    throw new Error(`${label} article must keep the FAQ as the final H2 section.`)
  }

  if (faqCount < 3) {
    throw new Error(`${label} article must include at least 3 FAQ items (found ${faqCount}).`);
  }

  if (faqAnswerWordCounts.some((count) => count > FAQ_ANSWER_MAX_WORDS)) {
    throw new Error(`${label} FAQ answers must stay under ${FAQ_ANSWER_MAX_WORDS} words each.`)
  }

  if (containsMarkdownTable(body)) {
    throw new Error(`${label} article must not include markdown tables.`);
  }
}

function validateKeyAnswer(keyAnswer, locale) {
  const label = locale === 'es' ? 'Spanish' : 'English'
  const normalized = keyAnswer?.trim()

  if (!normalized) {
    throw new Error(`${label} keyAnswer is required.`)
  }

  if (normalized.length > KEY_ANSWER_MAX_LENGTH) {
    throw new Error(`${label} keyAnswer must be ${KEY_ANSWER_MAX_LENGTH} characters or fewer.`)
  }
}

function inferLocaleFromFilePath(filePath) {
  const normalized = filePath.split(path.sep).join('/')

  if (normalized.includes('/src/content/blog/es/')) return 'es'
  if (normalized.includes('/src/content/blog/en/')) return 'en'

  throw new Error(`Could not infer locale from path: ${filePath}`)
}

function validateBlogFrontmatter(data, locale, filePath) {
  const label = locale === 'es' ? 'Spanish' : 'English'
  const requiredFields = ['title', 'excerpt', 'keyAnswer', 'date', 'lastReviewed', 'category']

  for (const field of requiredFields) {
    if (typeof data[field] !== 'string' || !data[field].trim()) {
      throw new Error(`${label} post is missing required frontmatter field "${field}" in ${filePath}.`)
    }
  }

  validateKeyAnswer(data.keyAnswer, locale)

  if (!BLOG_CATEGORIES.includes(data.category)) {
    throw new Error(`${label} post category must be one of: ${BLOG_CATEGORIES.join(', ')} in ${filePath}.`)
  }
}

function validateExistingMarkdownFile(filePath) {
  const absolutePath = path.resolve(filePath)

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${filePath}`)
  }

  const locale = inferLocaleFromFilePath(absolutePath)
  const source = fs.readFileSync(absolutePath, 'utf8')
  const { data, content } = matter(source)

  validateBlogFrontmatter(data, locale, filePath)
  validateArticleBody(content.trim(), locale)

  return {
    filePath,
    locale,
    slug: path.basename(filePath, '.md'),
  }
}

function getAllBlogMarkdownFiles() {
  return ['es', 'en'].flatMap((locale) => {
    const localeDir = path.join(BLOG_DIR, locale)
    if (!fs.existsSync(localeDir)) return []

    return fs.readdirSync(localeDir)
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => path.join(localeDir, filename))
  })
}

function runExistingPostValidation(opts) {
  const targets = opts.validateAll ? getAllBlogMarkdownFiles() : [opts.validateFile]
  const results = []
  const failures = []

  for (const target of targets) {
    try {
      results.push(validateExistingMarkdownFile(target))
    } catch (error) {
      failures.push({ target, message: error.message })
    }
  }

  if (failures.length > 0) {
    const summary = failures
      .map(({ target, message }) => `- ${target}: ${message}`)
      .join('\n')

    throw new Error(`GEO validation failed for ${failures.length} file(s):\n${summary}`)
  }

  console.log(`\nValidated ${results.length} blog post${results.length === 1 ? '' : 's'} successfully.`)

  for (const result of results) {
    console.log(`- [${result.locale}] ${result.slug}`)
  }
}

function validateGeneratedPost(parsed) {
  validateArticleBody(parsed.article_es, 'es');
  validateArticleBody(parsed.article_en, 'en');
  validateKeyAnswer(parsed.keyAnswer_es, 'es')
  validateKeyAnswer(parsed.keyAnswer_en, 'en')
  if (!BLOG_CATEGORIES.includes(parsed.category)) {
    throw new Error(`Generated post category must be one of: ${BLOG_CATEGORIES.join(', ')}`);
  }
}

function buildRetryInstructions(message) {
  const trimmed = typeof message === 'string' ? message.trim() : ''

  if (!trimmed) return {}

  const match = trimmed.match(/^(Spanish|English)\s+(.+)$/)
  const baseInstruction = (detail) => {
    const lowerDetail = detail.toLowerCase()
    const instructions = [
      'Previous attempt failed validation.',
      `Fix this issue explicitly: ${detail}`,
      'Regenerate the full article so it still satisfies every other structural requirement.',
      `Keep the article body above ${ARTICLE_MIN_WORDS} words before returning the JSON.`,
      `Keep every FAQ answer under ${FAQ_ANSWER_MAX_WORDS} words.`,
      'Add concrete local detail instead of filler if you need more length.',
      'Do not mention the validation issue in the final article.',
    ]

    if (lowerDetail.includes('too short')) {
      instructions.push('Add one or two extra H2 or H3 sections with practical details, checklists, timelines or pricing context.')
    }

    if (lowerDetail.includes('faq answers must stay under')) {
      instructions.push('Rewrite each FAQ answer as a single compact paragraph of roughly 35 to 60 words.')
    }

    if (lowerDetail.includes('question-shaped h2')) {
      instructions.push('Make at least two non-FAQ H2 headings explicit real-user questions.')
    }

    return instructions.join(' ')
  }

  if (match) {
    const [, label, detail] = match
    return label === 'Spanish'
      ? { es: baseInstruction(detail) }
      : { en: baseInstruction(detail) }
  }

  return { both: baseInstruction(trimmed) }
}

function isRecoverableGenerationError(message) {
  return [
    'Gemini response is not valid JSON',
    'Could not parse JSON from Gemini response',
    'missing required field',
    'article must contain at least',
    'article must include at least',
    'article must end with a FAQ section',
    'article must keep the FAQ as the final H2 section',
    'article must include at least 2 question-shaped H2 headings',
    'FAQ answers must stay under',
    'article is too short',
    'article must not include markdown tables',
    'keyAnswer must be',
  ].some((fragment) => message.includes(fragment));
}

async function generateValidatedPost(keyword, model, partnerLink = null) {
  const maxAttempts = parseInt(process.env.GEMINI_GENERATION_MAX_ATTEMPTS || '3', 10);
  let lastError;
  let retryInstructions = {};

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      let parsed = await generateArticle(keyword, model, partnerLink, retryInstructions);
      parsed = normalizeGeneratedPost(parsed, keyword);
      validateGeneratedPost(parsed);
      return parsed;
    } catch (err) {
      lastError = err;

      if (attempt >= maxAttempts || !isRecoverableGenerationError(err.message)) {
        throw err;
      }

      retryInstructions = buildRetryInstructions(err.message);
      console.warn(`Generation attempt ${attempt} failed (${err.message}). Retrying...`);
    }
  }

  throw lastError || new Error('Generation failed without a specific error.');
}

// ---------------------------------------------------------------------------
// Write markdown files
// ---------------------------------------------------------------------------
function buildMarkdown(title, excerpt, keyAnswer, category, coverImage, date, body) {
  const lines = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `excerpt: ${JSON.stringify(excerpt)}`,
    `keyAnswer: ${JSON.stringify(keyAnswer)}`,
    `category: ${category}`,
    `date: "${date}"`,
    `lastReviewed: "${date}"`,
    `coverImage: "${coverImage}"`,
    '---',
    '',
    body.trim(),
    '',
  ]
  return lines.join('\n')
}

function writeMarkdownFiles(parsed, dryRun) {
  const today = new Date().toISOString().split('T')[0];

  const files = [
    {
      filePath: path.join(BLOG_DIR, 'es', `${parsed.slug_es}.md`),
      content: buildMarkdown(
        parsed.title_es,
        parsed.excerpt_es,
        parsed.keyAnswer_es,
        parsed.category,
        parsed.coverImage,
        today,
        parsed.article_es,
      ),
      label: `ES: src/content/blog/es/${parsed.slug_es}.md`,
    },
    {
      filePath: path.join(BLOG_DIR, 'en', `${parsed.slug_en}.md`),
      content: buildMarkdown(
        parsed.title_en,
        parsed.excerpt_en,
        parsed.keyAnswer_en,
        parsed.category,
        parsed.coverImage,
        today,
        parsed.article_en,
      ),
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

function findBlogSlugMapInsertIndex(content) {
  const exportMarker = 'export const blogSlugMap = {';
  const startIndex = content.indexOf(exportMarker);
  if (startIndex === -1) {
    throw new Error('Could not find blogSlugMap export in src/lib/blogSlugMap.js.');
  }

  const openingBraceIndex = content.indexOf('{', startIndex);
  let depth = 0;

  for (let index = openingBraceIndex; index < content.length; index += 1) {
    const char = content[index];

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;

      if (depth === 0) {
        return index;
      }
    }
  }

  throw new Error('Could not find the closing brace for blogSlugMap in src/lib/blogSlugMap.js.');
}

function validateBlogSlugMapContent(content) {
  const exportMarker = 'export const blogSlugMap = {';
  const startIndex = content.indexOf(exportMarker);
  if (startIndex === -1) {
    throw new Error('Could not validate blogSlugMap because the export marker is missing.');
  }

  const openingBraceIndex = content.indexOf('{', startIndex);
  const closingBraceIndex = findBlogSlugMapInsertIndex(content);
  const objectLiteral = content.slice(openingBraceIndex, closingBraceIndex + 1);

  try {
    new vm.Script(`(${objectLiteral})`);
  } catch (error) {
    throw new Error(`Generated blogSlugMap.js would be invalid: ${error.message}`);
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

  const insertIndex = findBlogSlugMapInsertIndex(content);

  const updated =
    content.slice(0, insertIndex) +
    '\n' +
    newEntries +
    content.slice(insertIndex);

  validateBlogSlugMapContent(updated);

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
async function main() {
  const opts = parseArgs();

  if (opts.validateFile || opts.validateAll) {
    try {
      runExistingPostValidation(opts)
    } catch (err) {
      console.error(`\nValidation error: ${err.message}`)
      process.exit(1)
    }
    return
  }

  const keyword = opts.fromQueue ? getNextFromQueue() : opts.keyword;

  if (opts.dryRun) {
    console.log('\n[DRY RUN MODE] No files will be written.\n');
  }

  // Pick a partner link to inject unless --no-partner flag is set
  let selectedPartner = null;
  if (!opts.noPartner) {
    const pick = pickPartnerForKeyword(keyword);
    if (pick) {
      selectedPartner = pick;
      console.log(`Partner link selected: ${pick.partner.name} (${pick.outboundLink.url})`);
    } else {
      console.log('No active partners found in link-partners.json — skipping partner link injection.');
      console.log('Add partners with status "active" to scripts/link-partners.json to enable link exchange.');
    }
  }

  const partnerLink = selectedPartner ? selectedPartner.outboundLink : null;

  let parsed;
  try {
    parsed = await generateValidatedPost(keyword, opts.model, partnerLink);
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

  if (selectedPartner) {
    trackPartnerLink(selectedPartner.partner.id, parsed.slug_es, parsed.slug_en, opts.dryRun);
  }

  if (!opts.dryRun && opts.fromQueue) {
    markKeywordDone(keyword);
    console.log(`Marked as done in queue: "${keyword}"`);
  }

  printSummary(parsed);

  if (opts.dryRun) {
    console.log('\n[DRY RUN] Remove --dry-run to actually generate the files.');
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  ARTICLE_MIN_WORDS,
  FAQ_ANSWER_MAX_WORDS,
  buildRetryInstructions,
  countWords,
  ensureMinFaqItems,
  ensureMinH2Count,
  ensureQuestionH2s,
  normalizeGeneratedPost,
  repairArticleBody,
  trimFaqAnswers,
  validateArticleBody,
};
