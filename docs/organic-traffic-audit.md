# Organic traffic audit (Sep 2026)

Companion to the GA4 diagnosis. **Do not treat GA Home (7 days) as Search Console.**

## GA snapshot (1 Aug – 15 Sep 2026)

| Signal | Value | Note |
|---|---|---|
| Active users | 334 | ~7–8 / day |
| `google / organic` sessions | 162 | Channel #1 — Organic is alive |
| `(direct) / (none)` | 158 | Likely Maps / WhatsApp / iOS / late consent leak |
| ChatGPT referral | 26 | Keep AI crawlers allowed (`robots.js`) |
| Key events | None (before this change) | Wire `generate_lead`, `contact_*`, `file_download` |
| Top page | Home ES (184 users) | Landings + catalogue underused |
| Catalogue bounce | 2.5% | Best engagement destination |

Home (7d) −72% with 15 users = noisy week on a small base, not “Organic = 0”.

## GSC API status (blocked)

`npm run` / `node scripts/keyword-research.js --dry-run --days 90` failed:

```
Google Search Console API has not been used in project 557234821306 before or it is disabled.
Enable: https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview?project=557234821306
```

Service account JSON is present in `.env.local`. After enabling the API:

1. Confirm SA email is a Search Console user (Settings → Users).
2. Re-run: `node scripts/keyword-research.js --dry-run --days 90 --top 20`
3. Compare **Performance 28d vs previous 28d**: clicks, impressions, CTR, position; split ES vs VE; pages vs queries.
4. Interpret vs GA Organic:
   - GSC stable + GA down → measurement / consent
   - Both down → ranking / coverage
   - Impressions OK, CTR down → titles / snippets

## Manual GSC checklist (UI)

- [ ] Coverage / pages indexing for `/es/reformas-*`, `/es/catalogo/*`, `/es/contacto-caracas`
- [ ] Sitemap `https://www.dekoramagroup.com/sitemap.xml` submitted
- [ ] Query filter last 7 days vs Aug–mid Sep for cliff
- [ ] Pages: home vs `/catalogo` vs city landings — push clicks to catalogue / city URLs

## Content queue notes

- `scripts/keywords-queue.json`: ~415 entries, ~312 pending; **0 Venezuela/Caracas keywords**.
- Pending cluster is heavy on **Mijas** + Costa del Sol “cuánto cuesta” variants — risk of cannibalising home / city pages.
- Prefer GSC position **5–20** after API is enabled. Until then, pending VE seeds were appended (see queue).

## Google Business Profile (local)

Align NAP with [`src/lib/site.js`](../src/lib/site.js) + [`src/lib/markets.js`](../src/lib/markets.js):

**Spain (Benalmádena / Costa del Sol)**

- [ ] Categories: reformas / materiales / cocina-baño
- [ ] Description = `businessDescription` from site.js
- [ ] Photos, products, weekly posts
- [ ] Review replies; UTM on website button if used

**Caracas**

- [ ] Separate GBP (or correct country listing) — not Costa del Sol address
- [ ] Phone `+58 414 433 6524`, email `cravelo@dekoramagroup.com`
- [ ] Website deep-link: `/es/contacto-caracas` or `/es/reformas-caracas`
- [ ] Categories + service areas (Altamira, Las Mercedes, Chacao, …)

## GA4 key events to mark (Admin → Events)

After deploy, mark as conversions / key events:

| Event | Source |
|---|---|
| `generate_lead` | Contact form success (`CTAFinal`) |
| `contact_whatsapp` | Floating WA, ContactChannels, contact pages |
| `contact_phone` | ContactChannels, contact pages |
| `contact_email` | ContactChannels, contact pages |
| `file_download` | Catalogue PDF download |
| `view_search_results` | Nav search + `/catalogo?q=` (engagement, optional key) |

Consent Mode v2: GTM loads with `analytics_storage` denied until Accept; Reject persists denied. Banner has Accept + Reject.

## Next ops actions (priority)

1. Enable Search Console API on GCP project `557234821306`.
2. Mark key events in GA4 Admin.
3. GSC 28d comparison for the Sept cliff.
4. GBP Caracas + Benalmádena pass.
5. Run keyword-research → prefer near-page-1 queries over more Mijas clones.
