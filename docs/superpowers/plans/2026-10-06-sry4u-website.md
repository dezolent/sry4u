# SRY4U Website Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans in this session. The user has approved implementation on main and expressly prohibited commits.

**Goal:** Implement the approved artist site with a fast static catalog and secure live event endpoint.
**Architecture:** Astro static pages with one on-demand Netlify endpoint. Local TypeScript content drives HTML, JSON-LD, Markdown, and release routes. Native browser code handles filters, lightbox, consent, and live updates.
**Tech Stack:** Astro, TypeScript, Netlify function, sitemap, Sharp, node:test, Playwright, axe.
**Spec:** `docs/superpowers/specs/2026-10-06-sry4u-website-design.md`

## Global Constraints
- Work on main. Do not commit, stage, push, or publish unreviewed changes.
- Preserve original brand/media/catalog assets and the user's existing staged changes.
- Keep BANDSINTOWN_API_KEY server-side and .env ignored.
- Use the supplied contacts and dated EPK facts, with no invented shows, merchandise, or preview audio.
- Respect reduced motion, keyboard navigation, responsive media, canonical sry4u.com, and safe outbound links.

## Review Focus
- Event venue-local date expiry without an explicit timezone must not pretend a UTC instant is known.
- A failed/malformed upstream feed must not claim there are no upcoming shows.
- Untrusted external link protocols and credential-bearing query fields must not reach rendered links.
- Filter state, empty results, and dialog focus restoration must work on mobile and keyboard.
- SEO metadata, event snapshots, text endpoints, and cover art must match the actual catalog.

### Task 1: Events and catalog contracts
**Files:** `src/lib/events.ts`, `src/lib/catalog.ts`, `tests/events.test.ts`, `tests/catalog.test.ts`, `src/pages/api/events.ts`.
**Interfaces:** EventFeed has `status`, `events`, `checkedAt`; normalizeEvents(raw, now) returns safe future event entries. Catalog helpers provide sorted releases, filtering and ISO duration.
- [x] Write contract tests for expiry, cancelled events, malformed payloads, URL safety/redaction, successful empty responses, errors/timeouts and search/genre/year/category combinations.
- [x] Run tests against missing behavior and confirm failure.
- [x] Implement functions and endpoint with timeout, five-minute caching, no secret logging.
- [x] Run full unit suite and a credential-safe real feed check.

### Task 2: Media and site foundation
**Files:** package/config/ignore files, `scripts/prepare-media.mjs`, site/artist/media data, layout and shared components.
**Interfaces:** media manifest maps source assets to optimized local derivatives; layout accepts title/description/image/JSON-LD.
- [x] Configure dependencies and Netlify static-plus-API build.
- [x] Generate inspected transparent portrait, optimized logos/gallery/covers/inspiration, favicon and sharing card.
- [x] Add semantic layout, navigation, socials, footer, consent, metadata and global design styling.
- [x] Verify generated images and build/type checks.

### Task 3: Pages and interactions
**Files:** home/music/EPK/404/fanlink/album pages, hero/shows/tracklist/gallery/about components, client scripts.
**Interfaces:** all Song/Album IDs generate routes; shared components consume the typed content.
- [x] Write browser checks for keyboard/mobile navigation, URL-backed filtering, empty/reset state, dialog focus/keyboard, motion pause and correct platform links.
- [x] Build complete pages and interactions from the approved spec.
- [x] Run browser checks and accessibility scans at desktop/mobile sizes.

### Task 4: Machine-readable output and deployment configuration
**Files:** Markdown/robots/llms routes, structured-data helpers, postbuild headers script, netlify.toml, GitHub CI, README/.env.example.
**Interfaces:** canonical HTML and Markdown share the same catalog/artist content; CSP hashes match emitted scripts.
- [x] Verify generated route coverage, JSON-LD shape, sitemap/canonical URLs, Markdown content and local assets against production output.
- [x] Implement canonical structured data, text routes, security headers, CI and daily rebuild hook configuration with no secrets.
- [x] Scan public output for secrets; run unit suite, Astro check, production build and browser tests.
- [x] Review the uncommitted implementation; leave preview running and report external deployment connection requirements.

## Verification and implementation notes
- Astro static output plus a standalone Netlify function replaces the adapter. This resolved local script-delivery problems and removed the adapter dependency vulnerabilities.
- Unit suite: 16 passing. 16 browser checks passing, covering desktop/mobile, filters, gallery, streaming links, event states, motion, accessibility, analytics consent and HTML-only navigation.
- Production verification checks all 20 song routes and 2 EP routes, metadata, JSON-LD, artwork, Markdown, sitemap, script hashes and secret isolation.
- Independent review identified the analytics queue shape and custom-origin event metadata; both were corrected.
- Deployment configuration is ready. Connecting the GitHub repository and Netlify site and setting environment variables remains an external launch step. No implementation commits, pushes or deployment were made, per user instruction.
- Final Astro check: zero errors/warnings/hints. Production dependency audit: zero known vulnerabilities. Preview available at http://127.0.0.1:4323/.

## Subsequent image migration — October 7, 2026
- Replaced the manual resizing pipeline and `public/images/optimized/` with Astro `Image` and `getImage()`.
- Source files used by the site live in `public/images/` and are imported as image metadata. Astro owns responsive WebP output and caching.
- Original catalog covers, selected inspiration and the transparent cutout were moved to public source locations; originals remain available for sharing and press downloads.
- The source-cover download command creates no display variants. README documents the updated workflow.
- Verification: 16 unit tests, 22 desktop/mobile browser checks, clean type check and production output checks. No new commits.
