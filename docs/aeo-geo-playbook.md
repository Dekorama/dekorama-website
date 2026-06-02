# AEO / GEO playbook — Dekorama

Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) for `https://www.dekoramagroup.com`.

## On-site checklist (every new blog post)

- [ ] Frontmatter includes `keyAnswer` (one sentence, ≤220 chars) and `lastReviewed`
- [ ] Body has `## Respuesta rápida` / `## Quick answer` after the intro
- [ ] At least 2 question-shaped H2 headings
- [ ] FAQ section with 3–5 standalone answers (≤80 words each)
- [ ] 2–4 internal links to service pages
- [ ] Facts match showroom (Benalmádena, phone, brands, price bands)

## Answer box template

**Spanish (`keyAnswer`):**  
`[Respuesta directa con cifra o rango + ubicación Costa del Sol + mención Dekorama si encaja naturalmente.]`

**English (`keyAnswer`):**  
`[Direct answer with figure or range + Costa del Sol location + Dekorama where natural.]`

**Quick answer H2 body:** 2–4 sentences expanding the `keyAnswer` with ranges, timelines, or what affects price.

## FAQ rules

- Title: `## Preguntas frecuentes` (ES) or `## Frequently asked questions` (EN)
- Each item: `### Question?` then one short paragraph
- No “see above” — answers must work in isolation (AI snippets)
- Rendered via `BlogFaqSection` + `FAQPage` JSON-LD on blog templates

## AI query queue

Secondary pipeline input: [`scripts/ai-queries-queue.json`](../scripts/ai-queries-queue.json)

- Pick next `status: "pending"` item monthly (or pair with GSC queue)
- Generate with `node scripts/generate-post.js --keyword "<query>"`
- Mark `done` + `targetSlug` when published

## Monthly AI visibility audit

Use [`docs/ai-visibility-audit-template.csv`](ai-visibility-audit-template.csv).

1. Run the same 30 queries each month in ChatGPT, Perplexity, and Google AI Mode (where available).
2. Log: Dekorama cited? URL cited? Competitor cited? Fact accuracy (price/location).
3. Track citation rate = rows with Dekorama URL or brand / 30.
4. Cross-check GSC (impressions, CTR) and GA4 (organic landings, contact events).

### Suggested 30 audit queries (15 ES + 15 EN)

See rows in the CSV template. Replace or extend from GSC “high impressions, low CTR” queries.

## Off-site GEO (quarterly)

- Google Business Profile: NAP matches [`src/app/[locale]/layout.js`](../src/app/[locale]/layout.js) LocalBusiness schema
- Weekly GBP post linking to newest blog URL
- Reviews mentioning service + city (natural language)
- `sameAs` social URLs consistent with live profiles
- 5–10 local citations with identical NAP

## Machine-readable assets

- [`public/llms.txt`](../public/llms.txt) — canonical business facts for AI crawlers (refresh quarterly)
- [`src/app/robots.js`](../src/app/robots.js) — explicit allow for GPTBot, ClaudeBot, PerplexityBot, etc.

## PR review (generated content)

Before merging automated posts:

- [ ] Prices and ranges plausible for Costa del Sol 2026
- [ ] No invented permits or legal claims
- [ ] Internal links use `/es/` or `/en/` paths
- [ ] Partner link only once, not in FAQ or CTA
