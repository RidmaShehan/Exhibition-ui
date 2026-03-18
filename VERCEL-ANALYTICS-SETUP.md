# Vercel Analytics, Speed Insights & Preview Deployments

## 1. Vercel Analytics

**Status:** Integrated in the app.

- **Package:** `@vercel/analytics`
- **Usage:** `<Analytics />` is rendered in `app/layout.tsx`.

**Enable in Vercel:**

1. Open [Vercel Dashboard](https://vercel.com) → your project.
2. Go to **Analytics** (or **Settings** → **Analytics**).
3. Turn on **Web Analytics** (and optionally **Audience** / **Top Pages** if on a paid plan).

No extra code is required; the component sends data when Analytics is enabled for the project.

---

## 2. Speed Insights

**Status:** Integrated in the app.

- **Package:** `@vercel/speed-insights`
- **Usage:** `<SpeedInsights />` is rendered in `app/layout.tsx`.

**Enable in Vercel:**

1. Open [Vercel Dashboard](https://vercel.com) → your project.
2. Go to **Speed Insights** (or **Settings** → **Speed Insights**).
3. Enable **Speed Insights**.

After enabling, the dashboard will show Core Web Vitals (LCP, FID, CLS, etc.) for Production (and Preview if available).

---

## 3. Preview Deployment (Pre-production)

Per [Vercel Environments](https://vercel.com/docs/deployments/environments#preview-environment-pre-production):

- **Preview** = pre-production: test changes without affecting the live site.
- **Production** = live site (e.g. pushing to `main` or deploying with `vercel --prod`).

**How Preview deployments are created:**

- Push to a branch that is **not** your production branch (e.g. `develop`, `staging`, `feature/xyz`).
- Open a **Pull Request** on GitHub/GitLab/Bitbucket (Vercel comments with preview URLs).
- Deploy from CLI **without** `--prod`:
  ```bash
  vercel
  ```

**Preview URLs:**

- **Branch-specific:** Always points to the latest deployment of that branch.
- **Deployment-specific:** Points to a specific commit’s deployment.

**Environment variables:**

- In **Project Settings → Environment Variables**, add variables and select **Preview** (and optionally **Production** / **Development**).
- Previews use **Preview** env vars; production uses **Production** env vars.

**Suggested workflow:**

1. Develop on a branch (e.g. `develop` or `feature/xyz`).
2. Push and open a PR → Vercel creates a Preview deployment and posts the URL.
3. Test on the Preview URL; when ready, merge to `main` to trigger Production.

---

## Quick reference

| Feature           | Package / Config      | Where it’s used   | Enable in Vercel              |
|------------------|------------------------|-------------------|--------------------------------|
| Analytics        | `@vercel/analytics`    | `app/layout.tsx`  | Dashboard → Analytics          |
| Speed Insights   | `@vercel/speed-insights` | `app/layout.tsx` | Dashboard → Speed Insights     |
| Preview deploys  | Git branch / PR / CLI  | Automatic         | Use non-main branch or `vercel` |

---

## CLI commands

```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy to Preview (no production)
vercel

# Deploy to Production
vercel --prod

# Pull env vars for local dev (e.g. Preview)
vercel env pull .env.local
```
