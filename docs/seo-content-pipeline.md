# SEO Content Pipeline

Self-hosted alternative to Soro. Uses Google Gemini Flash to generate bilingual SEO blog posts (ES + EN) from a keyword, and publishes them via GitHub Actions on a daily schedule.

---

## How it works

1. **Keyword research** — `keyword-research.js` queries Google Search Console for queries ranked 5–20 (near-ranking, highest ROI). Results are written to `scripts/keywords-queue.json`.
2. **Article generation** — `generate-post.js` sends the keyword to Gemini Flash with a brand-aware system prompt. Gemini returns a JSON object with both language versions.
3. **File writing** — The script writes two `.md` files to `src/content/blog/es/` and `src/content/blog/en/`, and appends the slug pair to `src/lib/blogSlugMap.js`.
4. **GitHub Actions** — Runs automatically every day at 09:00 UTC, picks the next keyword from the queue, generates a post, and opens a PR for your review before any content goes live.

---

## Setup

### 1. Get a Gemini API key

Go to [https://aistudio.google.com](https://aistudio.google.com) → Get API key. Monitor usage if you publish daily (free tier may need a paid plan at scale).

Add it to `.env.local`:
```
GEMINI_API_KEY=your_key_here
```

### 2. Set up Google Search Console API access

This is required only for the keyword research script. If you prefer to add keywords manually, skip this step.

**a.** Go to [Google Cloud Console](https://console.cloud.google.com) → Create a project (or use an existing one).

**b.** Enable the **Google Search Console API** for that project.

**c.** Create a **Service Account**: IAM & Admin → Service Accounts → Create. No special roles needed.

**d.** Create a **JSON key** for the service account and download it.

**e.** In [Google Search Console](https://search.google.com/search-console), go to **Settings → Users and permissions → Add user**. Add the service account email (e.g. `my-account@my-project.iam.gserviceaccount.com`) as a **Restricted** user.

**f.** Base64-encode the key file:
```bash
base64 -i service-account.json | tr -d "\n"
```

**g.** Add to `.env.local`:
```
GOOGLE_SERVICE_ACCOUNT_JSON=<the base64 string>
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://www.dekoramagroup.com
```

### 3. Add GitHub Actions secrets

In your GitHub repo → **Settings → Secrets and variables → Actions**, add:

| Secret name | Value |
|---|---|
| `GEMINI_API_KEY` | Your Gemini API key |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Base64-encoded service account JSON |
| `GOOGLE_SEARCH_CONSOLE_SITE_URL` | `https://www.dekoramagroup.com` |

### 4. Install dependencies

```bash
npm install
```

(`@google/generative-ai` and `googleapis` are listed as devDependencies.)

---

## Usage

### Seed the queue with curated topics (~400 phrases)

Adds Dekorama-focused keywords (reformas, cocinas, baños, porcelánico, ciudades Costa del Sol) without duplicating existing entries:

```bash
npm run seed:keywords
npm run seed:keywords -- --dry-run   # preview only
```

Source list: `scripts/data/keyword-seeds.js`. Re-run after editing that file to append new phrases.

### Run keyword research manually

Fetches near-ranking queries from Google Search Console and writes them to the queue:

```bash
npm run research:keywords
```

Options:
```bash
node scripts/keyword-research.js --days 90       # Look back 90 days (default: 60)
node scripts/keyword-research.js --top 30        # Keep top 30 results (default: 20)
node scripts/keyword-research.js --min-impressions 20
node scripts/keyword-research.js --dry-run       # Print results, don't update queue
```

### Generate a post from a specific keyword

```bash
npm run generate:post -- --keyword "suelos porcelanicos terraza Marbella"
```

This generates both ES and EN articles and writes:
- `src/content/blog/es/{slug}.md`
- `src/content/blog/en/{slug}.md`
- Updates `src/lib/blogSlugMap.js`

### Generate the next post from the queue

```bash
npm run generate:post:next
```

Picks the first `pending` item in `scripts/keywords-queue.json`, generates the post, and marks it as `done`.

### Dry run (preview without writing files)

```bash
npm run generate:post -- --keyword "cocinas de diseño Marbella" --dry-run
```

---

## Managing the keyword queue

The queue lives in `scripts/keywords-queue.json`. Each entry has a `status` field:

- `"pending"` — not yet processed
- `"done"` — post has been generated

You can edit this file manually to add, reorder, or remove keywords. The generation script always picks the first `pending` entry.

Example entry:
```json
{
  "keyword": "reformas de cocina con isla Marbella",
  "locale": "both",
  "added": "2026-05-20",
  "status": "pending"
}
```

---

## GitHub Actions workflow

The workflow file is at `.github/workflows/generate-content.yml`.

**Automatic:** Runs every day at 09:00 UTC. Takes the next keyword from the queue.

**Manual trigger:** Go to **Actions → Generate SEO Blog Post → Run workflow**. You can optionally type a specific keyword to override the queue.

When the script completes, the workflow opens a **Pull Request** with the new markdown files. The PR includes a review checklist. **Nothing goes live until you merge the PR.**

### PR review checklist

Before merging, verify:
- Spanish article reads naturally and is factually accurate
- English article is appropriate for an international/expat audience
- Cover image is relevant
- Internal links point to real pages
- No incorrect claims about prices, dimensions, or products
- The CTA at the end is appropriate

---

## Cost

| Item | Cost |
|---|---|
| Gemini 2.0 Flash | ~€0.01 per article (input + output tokens) |
| Google Search Console API | Free |
| GitHub Actions | Free (within monthly limits) |
| **Total per month (4 posts)** | **~€0.04** |

Compare to Soro: €49–€299/month.

---

## File structure

```
scripts/
  generate-post.js       Main CLI script
  keyword-research.js    GSC keyword discovery
  keywords-queue.json    Keyword work queue
  prompts/
    system.js            Gemini system prompt (brand voice)

.github/
  workflows/
    generate-content.yml  Scheduled automation

src/
  content/
    blog/
      es/                Spanish posts (.md files)
      en/                English posts (.md files)
  lib/
    blogSlugMap.js        ES ↔ EN slug mapping (updated by script)
    blog.js               Blog file reader (no changes needed)
```

---

## Customising the brand voice

Edit `scripts/prompts/system.js` to change:
- Business description
- Internal link targets
- Writing tone (formal/informal, length, etc.)
- Article structure requirements

Changes take effect on the next run — no rebuild needed.
