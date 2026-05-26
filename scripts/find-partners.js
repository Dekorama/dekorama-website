#!/usr/bin/env node
/**
 * find-partners.js
 *
 * Partner prospecting tool for the Dekorama link exchange network.
 * Generates Google search queries to find candidate sites and ready-to-use
 * outreach email templates in Spanish and English.
 *
 * Usage:
 *   node scripts/find-partners.js --niche interior-design
 *   node scripts/find-partners.js --niche real-estate --lang en
 *   node scripts/find-partners.js --list-niches
 *   node scripts/find-partners.js --status          # show current partner statuses
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const PARTNERS_PATH = path.join(ROOT, 'scripts', 'link-partners.json');

// ---------------------------------------------------------------------------
// Niche definitions
// ---------------------------------------------------------------------------
const NICHES = {
  'interior-design': {
    label: 'Interior design & decoration',
    searchQueriesEs: [
      '"diseño de interiores" Málaga blog "escríbenos" OR "contacto" OR "colabora"',
      '"decoración de interiores" "Costa del Sol" blog site:es',
      '"interiorismo" Andalucía blog "guest post" OR "artículo invitado"',
      '"reforma y decoración" España blog filetype:html -pinterest -instagram',
      '"decoración del hogar" blog Marbella OR Fuengirola OR Benalmádena',
    ],
    searchQueriesEn: [
      'interior design blog Costa del Sol "write for us" OR "guest post"',
      '"interior design" Spain expat blog site:.com OR site:.es',
      '"home decor" Andalusia blog "collaborate" OR "contact"',
      'interior design Marbella blog "submit an article"',
    ],
  },
  'real-estate': {
    label: 'Real estate (Costa del Sol / Málaga)',
    searchQueriesEs: [
      '"inmobiliaria" "Costa del Sol" blog "colaboración" OR "artículo invitado"',
      '"comprar piso Marbella" blog inmobiliario site:es',
      '"inversión inmobiliaria" Málaga blog -idealista -fotocasa',
      '"agencia inmobiliaria" Marbella OR Fuengirola blog contacto',
    ],
    searchQueriesEn: [
      '"Costa del Sol" property blog "write for us" OR "guest post"',
      '"buy property Spain" expat blog site:.com -rightmove -zoopla',
      '"Marbella real estate" blog "collaborate" OR "partnership"',
      '"property investment Spain" blog contact -agency',
      'Costa del Sol expat property guide blog "submit article"',
    ],
  },
  'architecture': {
    label: 'Architecture firms',
    searchQueriesEs: [
      '"estudio de arquitectura" Málaga OR "Costa del Sol" blog',
      '"arquitecto" Marbella blog "artículo" OR "colaboración"',
      '"arquitectura residencial" Andalucía blog site:es',
      '"reforma y arquitectura" blog España -OCC -infojobs',
    ],
    searchQueriesEn: [
      'architecture studio Costa del Sol blog "guest post" OR "write for us"',
      '"residential architecture" Spain blog site:.com -archdaily',
      'architect Marbella blog "collaborate" OR "partner"',
    ],
  },
  'materials-suppliers': {
    label: 'Tile, ceramic & material suppliers',
    searchQueriesEs: [
      '"porcelánico" blog España "artículo invitado" OR "colabora"',
      '"azulejos" OR "revestimientos" blog fabricante España site:es',
      '"materiales de construcción" blog España "escríbenos"',
      '"grifería" OR "sanitarios" blog España -catálogo',
      '"suelos y revestimientos" blog España "contacto"',
    ],
    searchQueriesEn: [
      '"porcelain tiles" Spain blog "write for us" OR "guest post"',
      '"ceramic tiles" Andalusia supplier blog site:.com OR site:.es',
      '"building materials" Spain blog collaborate',
    ],
  },
  'expat-lifestyle': {
    label: 'Expat lifestyle & relocation',
    searchQueriesEn: [
      '"expat" "Costa del Sol" OR "Marbella" blog "write for us" OR "guest post"',
      '"living in Spain" expat blog "submit article" OR "collaborate"',
      '"moving to Spain" blog site:.com -expatica',
      '"expat life" Málaga OR Marbella OR Fuengirola blog contact',
      '"British expats Spain" blog "guest contribution"',
    ],
    searchQueriesEs: [
      '"expatriados" España blog colaboración OR "artículo invitado"',
      '"residentes extranjeros" "Costa del Sol" blog "escríbenos"',
    ],
  },
  'home-improvement': {
    label: 'Home improvement & DIY',
    searchQueriesEs: [
      '"reformas del hogar" blog España "artículo invitado" OR "colabora"',
      '"bricolaje y reforma" blog España site:es',
      '"mejorar tu casa" blog España "escríbenos" OR "contacto"',
      '"reforma baño" OR "reforma cocina" blog España -OCU',
      '"hogar y reforma" España blog "guest post"',
    ],
    searchQueriesEn: [
      '"home renovation" Spain blog "write for us" OR "guest post"',
      '"DIY home improvement" Spain expat blog site:.com',
      '"house renovation" Costa del Sol blog "collaborate"',
    ],
  },
};

// ---------------------------------------------------------------------------
// Outreach templates
// ---------------------------------------------------------------------------
function buildOutreachEmailEs(niche) {
  const nicheLabel = NICHES[niche]?.label || niche;
  return `
────────────────────────────────────────────────────────────
PLANTILLA DE CONTACTO (Español) — Nicho: ${nicheLabel}
────────────────────────────────────────────────────────────
Asunto: Colaboración de contenido — intercambio de enlaces entre [NOMBRE DE SU SITIO] y Dekorama

Hola [NOMBRE],

Me llamo [TU NOMBRE] y trabajo en Dekorama, una empresa de materiales y reformas integrales
en Benalmádena (Costa del Sol, Málaga). Llevamos más de 12 años ayudando a propietarios,
interioristas y estudios de arquitectura a renovar sus hogares con materiales de primera calidad.

He visto vuestro blog y creo que hay una oportunidad de colaboración que puede beneficiar a ambos:

NUESTRA PROPUESTA:
• Incluimos un enlace hacia una página relevante de vuestro sitio en uno de nuestros artículos
  de blog, de forma natural y contextual (sin etiquetas de patrocinado).
• A cambio, os pedimos que incluyáis un enlace hacia dekorama.es en uno de vuestros artículos
  existentes o futuros, también de forma contextual.

El contenido de nuestro blog cubre temas como reformas integrales, materiales de construcción,
tendencias en baños y cocinas, y guías prácticas para propietarios en la Costa del Sol.

Si os interesa explorar esta colaboración, estaré encantado de compartir más detalles.

Un saludo,
[TU NOMBRE]
Dekorama | dekorama.es
[EMAIL] | [TELÉFONO]
────────────────────────────────────────────────────────────
`;
}

function buildOutreachEmailEn(niche) {
  const nicheLabel = NICHES[niche]?.label || niche;
  return `
────────────────────────────────────────────────────────────
OUTREACH TEMPLATE (English) — Niche: ${nicheLabel}
────────────────────────────────────────────────────────────
Subject: Content collaboration — link exchange between [THEIR SITE NAME] and Dekorama

Hi [NAME],

My name is [YOUR NAME] and I work with Dekorama, a premium renovation materials and
full-service renovation company based in Benalmádena on the Costa del Sol, Málaga.
We have been helping homeowners, interior designers and architects renovate their homes
for over 12 years.

I came across your blog and think there is a mutual benefit in a simple content collaboration:

WHAT WE PROPOSE:
• We include a link to a relevant page on your website within one of our blog articles,
  placed naturally and contextually (no sponsored label needed).
• In return, we ask that you include a link to dekorama.es in one of your existing or
  upcoming articles, also placed contextually.

Our blog covers home renovation, building materials, bathroom and kitchen trends,
and practical guides for property owners on the Costa del Sol.

If this sounds interesting, I am happy to share more specifics.

Kind regards,
[YOUR NAME]
Dekorama | dekorama.es
[EMAIL] | [PHONE]
────────────────────────────────────────────────────────────
`;
}

function buildCsvTemplate() {
  return `
────────────────────────────────────────────────────────────
CSV TEMPLATE — paste into link-partners.json after filling in
────────────────────────────────────────────────────────────
When a site agrees, add an entry like this to scripts/link-partners.json:

{
  "id": "<short-unique-id>",
  "name": "<Site Name>",
  "domain": "<their-domain.com>",
  "niches": ["<niche-tag>"],
  "language": "es|en|both",
  "status": "contacted",
  "outboundLinks": [
    {
      "url": "<the URL on their site to link to>",
      "anchorText": "<anchor text to use in your article>",
      "contextHint": "<when/how to use this link naturally>"
    }
  ],
  "inboundLinks": [
    {
      "dekoramaUrl": "/es/or-en/your-page",
      "suggestedAnchor": "<anchor text you want them to use>"
    }
  ],
  "articlesLinked": [],
  "notes": ""
}

Change status to "active" once you have confirmed the link exchange with the partner.
────────────────────────────────────────────────────────────
`;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { niche: null, lang: 'both', listNiches: false, showStatus: false };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--niche':       opts.niche = args[++i]; break;
      case '--lang':        opts.lang = args[++i]; break;
      case '--list-niches': opts.listNiches = true; break;
      case '--status':      opts.showStatus = true; break;
    }
  }

  return opts;
}

function showStatus() {
  if (!fs.existsSync(PARTNERS_PATH)) {
    console.log('No link-partners.json found.');
    return;
  }
  const { partners } = JSON.parse(fs.readFileSync(PARTNERS_PATH, 'utf8'));
  const byStatus = { prospect: [], contacted: [], active: [], paused: [] };

  for (const p of partners) {
    (byStatus[p.status] || byStatus.prospect).push(p);
  }

  console.log('\nPartner registry status:');
  console.log('─'.repeat(48));
  for (const [status, list] of Object.entries(byStatus)) {
    console.log(`\n${status.toUpperCase()} (${list.length}):`);
    for (const p of list) {
      const linked = (p.articlesLinked || []).length;
      console.log(`  • ${p.name} (${p.domain}) — ${linked} article(s) linked`);
    }
  }
  console.log('');
}

(function main() {
  const opts = parseArgs();

  if (opts.showStatus) {
    showStatus();
    return;
  }

  if (opts.listNiches) {
    console.log('\nAvailable niches:');
    for (const [key, def] of Object.entries(NICHES)) {
      console.log(`  --niche ${key.padEnd(20)} ${def.label}`);
    }
    console.log('');
    return;
  }

  if (!opts.niche) {
    console.error('Usage: node scripts/find-partners.js --niche <niche>');
    console.error('       node scripts/find-partners.js --list-niches');
    console.error('       node scripts/find-partners.js --status');
    process.exit(1);
  }

  const def = NICHES[opts.niche];
  if (!def) {
    console.error(`Unknown niche: "${opts.niche}". Run --list-niches to see valid options.`);
    process.exit(1);
  }

  console.log(`\n${'═'.repeat(64)}`);
  console.log(`  Partner Prospecting — ${def.label}`);
  console.log(`${'═'.repeat(64)}`);

  if (opts.lang !== 'en') {
    console.log('\nSearch queries (Spanish — paste into Google):');
    for (const q of (def.searchQueriesEs || [])) {
      console.log(`  ${q}`);
    }
  }

  if (opts.lang !== 'es') {
    console.log('\nSearch queries (English — paste into Google):');
    for (const q of (def.searchQueriesEn || [])) {
      console.log(`  ${q}`);
    }
  }

  if (opts.lang !== 'en') console.log(buildOutreachEmailEs(opts.niche));
  if (opts.lang !== 'es') console.log(buildOutreachEmailEn(opts.niche));

  console.log(buildCsvTemplate());
})();
