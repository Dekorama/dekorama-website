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

### GBP + directories checklist (Benalmádena / Marbella / porcelánicos)

Canonical NAP (copy exactly everywhere):

- Name: Dekorama
- Address: Las Ventas, Avenida Tivoli, 17, Centro Comercial, Local 5, 29631 Benalmádena, Málaga, Spain
- Phone: +34 628 571 537
- Website: https://www.dekoramagroup.com
- Hours: Mon–Fri 09:00–18:00, Sat 10:00–14:00
- Experience claim: 12+ years (never 10 or 20)

**Google Business Profile**

- [ ] Primary category: Contractor / Reformas (or local equivalent: Building renovation service)
- [ ] Secondary: Tile store / Bathroom supply store / Kitchen supply store (as available)
- [ ] Service areas: Benalmádena, Marbella, Fuengirola, Estepona, Torremolinos, Málaga
- [ ] Description matches [`businessDescription`](../src/lib/site.js) / GBP text
- [ ] Products/services list: reformas integrales, cocinas, baños, porcelánicos, grifería
- [ ] Photos: showroom exterior, interior, projects (monthly refresh)
- [ ] Weekly post linking to money pages: `/es/reformas-benalmadena`, `/es/reformas-marbella`, `/es/porcelanicos-malaga`
- [ ] Ask finished clients for reviews that mention city + service (e.g. “reforma integral Benalmádena”)
- [ ] Reply to every review within 7 days

**Directories (same NAP)**

- [ ] Habitissimo
- [ ] Cronoshare
- [ ] Poblanas / local Málaga listings
- [ ] Apple Maps / Bing Places if missing
- [ ] Instagram / Facebook / Pinterest bio address + phone match NAP

**Ads (optional short-term)**

- [ ] Exact-match campaigns only if budget allows: `reformas integrales benalmadena`, `reformas marbella`, `porcelanicos malaga`
- [ ] Landing URLs = money pages above (not homepage)

**Measure**

- [ ] GSC: impressions/CTR for those queries; confirm `/es/reformas-benalmadena` indexed
- [ ] GBP Insights: calls, direction requests, website clicks
- [ ] Monthly AI audit per template in this playbook

## Brand sitelinks — post-deploy GSC checklist

Organic sitelinks are algorithmic (cannot request them). After deploy of brand hubs:

- [ ] GSC → Performance → Queries: filter `dekorama`, `dekorama group`, `grupo dekorama`
- [ ] Note impressions + CTR for exact brand query (baseline for sitelinks eligibility)
- [ ] GSC → Pages: confirm hubs indexed — `/es/cocinas-a-medida`, `/es/banos-completos`, `/es/materiales`, `/es/reformas-integrales`, `/es/proyectos`, `/es/contacto`
- [ ] Brand name consistent: web title, GBP, Instagram/Facebook (`Dekorama` / `Grupo Dekorama`)
- [ ] Re-check branded SERP in 4–8 weeks (incognito); sitelinks may lag authority + query volume
- [ ] Do not expect Porcelanosa-style sitelinks until branded search volume and engagement rise

## Machine-readable assets

- [`public/llms.txt`](../public/llms.txt) — canonical business facts for AI crawlers (refresh quarterly)
- [`src/app/robots.js`](../src/app/robots.js) — explicit allow for GPTBot, ClaudeBot, PerplexityBot, etc.

## PR review (generated content)

Before merging automated posts:

- [ ] Prices and ranges plausible for Costa del Sol 2026
- [ ] No invented permits or legal claims
- [ ] Internal links use `/es/` or `/en/` paths
- [ ] Partner link only once, not in FAQ or CTA
