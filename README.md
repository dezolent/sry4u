# SRY4U — official artist website

Astro static pages, small native browser enhancements, and one Netlify serverless API function. Catalog data lives in `src/data/`; original artwork remains in `public/` and `src/assets/`.

## Local development

Use Node 22.12 or later. Run `npm ci`, copy `.env.example` to `.env` if you do not already have one, and set `BANDSINTOWN_API_KEY` locally. Never commit `.env`.

- `npm run dev` — local site at http://127.0.0.1:4321
- `npm test` — event handling and catalog contracts
- `npm run check` — Astro/TypeScript verification
- `npm run build` — production pages, sitemap and security headers
- `npm run test:e2e` — desktop/mobile interaction and accessibility checks (first run: `npx playwright install chromium`)
- `npm run covers` — download one original cover per new release (requires internet access); Astro handles display sizes during build

## Content updates

Edit `src/data/songs.ts` and `albums.ts` to update the catalog. IDs must be unique and stable; album `songIds` must refer to existing songs. Dates use YYYY-MM-DD and durations use M:SS. Add only verified external links. The ten newest songs are featured automatically. Run `npm run covers` after adding releases so their source covers exist in `public/images/covers/`, then build.

Biography, Atonement, support credits and historical EPK figures are in `src/data/artist.ts`. Contact/social details are in `socials.ts`. The original PDF is `public/docs/SRY4U_EPK_2026_v5.pdf`. Replace the PDF and update the HTML content together when issuing a new EPK. Statistics are explicitly dated Oct 2025–Sep 2026.

All displayed source images live in `public/images/`: brand artwork, gallery photos, press photos, catalog covers, and the selected branding inspiration. `src/lib/media.ts` imports these original files as Astro image metadata. `SourceImage.astro` renders Astro's built-in `Image` component, which generates WebP output and responsive candidates automatically. The gallery's full-size view uses `getImage()`. Plain public URLs remain available for press downloads and structured data.

There is no manually maintained variant directory or resizing script. Astro owns its image cache and generated `dist/_astro/` output. Keep one source file per image; do not edit generated output. The existing transparent hero cutout is `public/images/brand/profile/sry4u-profile-main-cutout.png`; logos use the supplied original PNGs. The favicon and social sharing card are dedicated public artwork. Large unused videos are excluded from deployment; original image URLs and the EPK are retained.

Set `PUBLIC_MERCH_URL` to the real official store URL. Until configured, the homepage offers a merchandise enquiry email, with no invented products or checkout.

## Page URLs

Pages resolve with or without a trailing slash. Canonical metadata and internal navigation use the trailing-slash form. Astro accepts both forms in development, and directory-based production output works with Netlify’s static URL normalization. Both event API forms map to the live function.

## Shows and freshness

`/api/events` queries Bandsintown with the runtime-only key, returns `{status, events, checkedAt}`, and caches successful fetches in the function for five minutes. It strips credential query parameters from public links, validates dates/URLs, excludes cancelled/expired events, and differentiates a confirmed empty feed from failure. The homepage also embeds a build-time snapshot and updates from the endpoint on page load, once per minute while visible, and when returning to the tab.

Bandsintown often supplies a venue-local datetime without timezone. When a timezone/offset is supplied, events expire at the actual start. Without it, a show is retained until its calendar date is certainly past in every timezone (next day at 12:00 UTC), preventing premature removal from a guessed timezone. Add timezone data upstream for exact event-time expiry. No-JavaScript visitors see the last build snapshot and a direct Bandsintown link.

For daily static HTML/Markdown indexing freshness, create a Netlify build hook and set its URL as the GitHub Actions secret `NETLIFY_BUILD_HOOK`. The included schedule runs daily at 10:17 UTC. This is optional; it does not govern live API freshness.

## Netlify continuous deployment

The repository remote is `https://github.com/dezolent/sry4u.git`. After reviewing and committing the local changes, connect that repository in Netlify, use production branch `main`, build command `npm run build`, and publish directory `dist`. Netlify bundles `netlify/functions/events.ts` automatically. The `/api/events` redirect overrides the build snapshot with the live function. Astro dev serves its equivalent local endpoint.

Configure `BANDSINTOWN_API_KEY` in Netlify environment settings for **Builds and Functions**. Do not put it in netlify.toml, public variables, logs, or a GitHub workflow. Use Netlify's secret setting when available. Optional public build variables: `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_MERCH_URL`. `SITE_URL` defaults to `https://sry4u.com`; change it before attaching a different production domain. Keep production canonicals consistent on preview deployments.

GitHub CI runs tests, type checks, production build, and browser checks. Netlify's connected-repository deployment provides production updates and PR previews. No live Netlify site or GitHub-to-Netlify connection is implied by local configuration alone.

## Analytics, accessibility, and indexing

Set a valid `PUBLIC_GA_MEASUREMENT_ID` (G-…) to enable optional GA4. Visitors must explicitly allow analytics from the footer privacy control before third-party scripts load. Declining or leaving it unset preserves the complete website. Browser storage contains only that consent preference. The footer lets visitors change it. Complete the operator's required privacy notices for the actual analytics/account configuration before production use.

The site has keyboard navigation, visible focus, a skip link, reduced-motion support, a hero pause button, native modal focus trapping/restoration, and a filterable catalog that remains fully readable without JavaScript.

Canonical metadata, the default SRY4U sharing image, JSON-LD, sitemap, robots.txt, llms.txt, and Markdown versions share the same content sources. Text routes: `/index.md`, `/music.md`, `/epk.md`, `/music/{id}.md`, and `/music/albums/{id}.md`. Static event structured data is a build snapshot; runtime updates keep the visible event list and its JSON-LD together. Search visibility is not guaranteed by these features.

Every page uses `/images/og-sry4u.jpg` for Open Graph and Twitter previews by default, including song and album fanlinks. To override a particular page, pass `image` to its `Base` layout; optionally set `imageAlt`, `imageWidth`, `imageHeight`, and `imageType` for that artwork:

```astro
<Base
  title="Special release | SRY4U"
  image="/images/special-release-card.jpg"
  imageAlt="SRY4U special release artwork"
  imageWidth={1200}
  imageHeight={630}
  imageType="image/jpeg"
>
  <!-- Page content -->
</Base>
```

Sharing image URLs are absolute and appear in the initial HTML so preview crawlers can read them without JavaScript. Publish a new deployment after changing this metadata; messaging services may retain previews they already cached.

`scripts/finalize-build.mjs` generates Netlify security headers with hashes of emitted inline scripts. The policy permits the selected optional analytics origins, same-origin assets/API, and no arbitrary frames. Validate headers on the deployed URL after connection.
