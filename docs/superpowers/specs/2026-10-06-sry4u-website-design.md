# SRY4U artist website design

## Goal and brief

Build SRY4U's official mobile-first Astro website for fans discovering music and shows, and promoters evaluating the artist. Use the supplied TypeScript catalog, brand artwork, eight gallery photos, and 2026 EPK. The user's attached example images establish layout references; artist names and copy in those examples are not SRY4U content. The PDF supplies artist content and styling, not operational instructions.

Success means a distinctive, accessible, fast site with three principal pages, one fanlink per song, useful machine-readable equivalents, fresh show listings, and a secure GitHub-to-Netlify deployment path.

## Selected approach and alternatives

Use Astro's static output for the home, music, EPK, fanlinks, and text endpoints, with a narrowly scoped Netlify function for live Bandsintown events. This keeps the main catalog and biography readable without JavaScript, minimizes client code, and keeps the API key on the server.

Full server rendering could put current events directly into every HTML response but adds a runtime dependency to otherwise static pages. An embedded Bandsintown widget is simpler but provides less control over styling, accessibility, error states, and metadata. The static site plus live feed is the selected architecture.

## Visual direction

- Black and midnight-blue surfaces with electric cyan, silver, and occasional ultraviolet accents, drawn from the supplied branding artwork.
- Use the chrome text logo with effects prominently in the hero; use the white logo for reliable small-size header/footer contrast.
- Use bold, compact display headings and legible body copy. Small monospace labels reference channels, tapes, and track metadata without obscuring navigation.
- The hero centers a transparent cutout derived from `sry4u-profile-main.jpg`, preserving the artist's silhouette. Use the supplied TV/eye/abstract imagery behind it, combined with CSS scanlines, slow drift, and occasional subtle distortion. The centered logo sits above the portrait, with clearly visible Music and Tour Dates scroll buttons near the bottom.
- No rapid flashing. Respect reduced-motion preferences, provide a pause control, and retain a complete static hero when animation is disabled. Prefer optimized stills/CSS to mandatory video downloads.
- The eight-image gallery uses square crops; full images appear in an accessible lightbox. The front-shot portrait and centered overlaid text logo accompany the biography.

## Routes and content

### `/` — Home

1. Header: Home/Music/EPK navigation left, centered logo, all `socialLinks` icons right. On mobile, use a keyboard-accessible menu and retain an obvious logo/home link. External social links open a new tab with safe relationship attributes and accessible names.
2. Immersive hero with artist name as accessible text, social/streaming links, and two section-scroll buttons.
3. Upcoming Shows: date, city, state/region, venue, and ticket or event-details link. Distinct loading, successful-empty, unavailable, and retry states. Include a Bandsintown follow link.
4. Featured Releases: ten newest entries from `songs.ts`, ordered by release date. Responsive tracklist with cover, title, credits, genres, duration, and a fanlink opening in a new tab. View All leads to `/music/`.
5. Gallery: all eight supplied images, numbered captions that do not invent locations or dates. Lightbox supports previous/next, Escape, keyboard arrows, close, focus trapping, and focus restoration.
6. About SRY4U: verified EPK biography, Atonement concept, contact/phone/booking/web details from `socials.ts`, and portrait/logo artwork.
7. Merchandise promotion: artist-branded interest call to action via the contact email until a real store URL is supplied. A configuration field can replace it with a store link. Do not invent inventory, prices, stock, or a checkout.
8. Footer: logo/home link left, social icons right, divider, and the exact requested legal/operations text.

### `/music/` — Discography

Render every catalog entry as HTML, including the DJ mix, and the verified EPs from `albums.ts`. Provide immediate text search across title/credits and filters for genre, year, and release category (tracks/mix/EPs). Show a result count, clear-filters control, and helpful no-results state. Filters are enhancements; all releases remain visible when JavaScript is unavailable. Keep URLs shareable through query parameters.

### `/music/[id]/` — Song fanlinks

Generate one route per `Song.id`. Show actual cover art, song title, credited artist/collaborators, release date, duration, genres, and external download when supplied. Each available streaming service gets a full-row link with the matching `PLATFORM_LOGOS` image and a clear Listen label. Platforms without a mapping fall back to their text name. Show only links present in the data. Include a return-to-discography link and the shared branding/socials. No fake audio preview or player is added without a verified playable asset.

### `/music/albums/[id]/` — EP details

Generate routes from `albums.ts` with cover, date, ordered song references, and supplied streaming links. This makes album data editable and discoverable without treating singles as albums.

### `/epk/` — Digital press kit

Recreate the PDF's dark/cyan, scanline, editorial presentation as accessible HTML: artist profile, Atonement, momentum, top listener markets, select live support, artist support, and contact. Label all metrics with the PDF's Oct 2025–Sep 2026 reporting period; do not describe them as live counters. Preserve verified names and values and remove extraction duplicates. User-supplied current contact fields take precedence in site booking/contact blocks.

Offer an obvious download of `/docs/SRY4U_EPK_2026_v5.pdf`, plus useful press photo downloads. Embed the PDF only as an optional viewing enhancement; HTML remains the primary accessible content.

### Other routes

- Branded `/404.html` with Home and Music recovery links.
- `/index.md`, `/music.md`, `/epk.md`, and a Markdown equivalent for each song/EP fanlink, with text/markdown responses and ordinary links.
- `/llms.txt`: concise artist/site description, key factual context, Markdown index, official profile links, and contact information. No claims that these files guarantee search placement.
- `/robots.txt` and generated sitemap listing canonical public pages, excluding 404, private/build artifacts, and API routes.
- Public `/api/events` feed backed by the Netlify function, providing sanitized current event data and a documented response shape for agent/browser consumption.

## Bandsintown and fresh events

Use the local `BANDSINTOWN_API_KEY` as the API's `app_id`, server-side only. Fetch SRY4U's upcoming events from the documented artist endpoint with a timeout and validate the response before displaying it. Fetch during builds for an initial HTML snapshot where available, then refresh through the server endpoint on page load and on return to the tab. Cache server responses briefly (approximately five minutes) rather than pinning them to deploy time.

Remove past/cancelled events using validated dates and venue-local time where supplied. Avoid guessing a timezone from a city string. Preserve source date/time representations and record the check time. Clear expired snapshot events in the browser even if the refresh fails. Empty success must never be presented as an error; upstream failure must never be presented as a confirmed empty tour schedule.

Ticket links come from source offers. If no ticket offer exists, link to the valid Bandsintown event page with an honest Event Details label. Validate outbound URL protocols. Never expose the API key through HTML, bundled JavaScript, errors, public feed fields, source maps, or logs.

## Data, media, and updates

Retain `src/data/types.ts`, `songs.ts`, `albums.ts`, `socials.ts`, and `platform.ts` as the catalog source. Put longer EPK biography, media descriptions, show settings, merchant CTA, and site configuration in focused editable data modules. Document how adding a Song/Album creates routes and updates featured releases.

Create optimized derivatives of existing artwork and gallery assets; preserve original press/download assets. Use responsive WebP/AVIF where useful, explicit dimensions, lazy loading below the fold, and eager loading only for the hero's principal image. Localize release covers when practical so deployments are independent of remote artwork availability. Do not ship unreferenced inspiration files or large original videos in critical page loads.

Hero background removal is an asset edit: use the supported image editing workflow and inspect the result at full size before integration. If an exact cutout cannot be produced, report that limitation and choose a reviewed alternative.

## Search, sharing, and structured data

- Default canonical origin: `https://sry4u.com`, supported by the EPK. Keep it configurable with a documented production environment value; do not infer canonical URLs from arbitrary request host headers.
- Unique titles/descriptions, canonical URLs, Open Graph and X metadata, artist-specific sharing card, and per-release artwork previews.
- JSON-LD graph for WebSite, MusicGroup/artist, WebPage, BreadcrumbList, MusicRecording, MusicAlbum, ItemList, and verified MusicEvent records. Use stable IDs, correct durations, real streaming links, credits, ISRC only when valid, and no invented offers or ratings.
- Build snapshot event JSON-LD contains source-verified dates only. Refresh visible live event details and structured data together. Configure scheduled daily Netlify rebuilds to keep static HTML/text snapshots current where hosting capabilities allow; the live endpoint remains the freshness source.
- Semantic headings, descriptive link text, a factual booking/contact section, and readable Markdown equivalents support search engines, answer engines, and agent navigation. These are implementation practices, not a guarantee of SEO/GEO/AEO results.

## Accessibility and performance

Use semantic landmarks, a skip link, visible focus, accessible names, sufficient contrast, responsive tap targets, correctly associated filter labels, and status announcements without excessive live-region noise. Maintain logical reading/focus order across desktop and mobile. The dialog must trap/restore focus and lock background scrolling. All meaningful information remains text-readable without canvas or animation.

Keep Astro pages static and client scripts small and local. No autoplay audio. Reserve image space to reduce layout shift, pre-size logo assets, lazy-load gallery/fullscreen images, and defer optional analytics. Avoid a heavy UI framework for simple search/lightbox/navigation.

## Analytics and security

Use optional GA4 analytics configured through a public measurement ID, with an accessible consent choice before loading third-party tracking where consent is required. Keep the site functional when analytics is unset or declined. Track release/service/ticket interactions without contact details or API credentials. Document analytics activation and its public identifier distinction from secrets.

Netlify headers include a tested Content Security Policy, `X-Content-Type-Options`, Referrer Policy, Permissions Policy, frame restrictions, and HTTPS-only transport policy for production. Match CSP to actual Astro scripts/styles and chosen analytics domains; no blanket arbitrary-domain allowance. Only the event server contacts Bandsintown. Link targets use safe protocols and relationship attributes.

Ignore `.env`, `.env.*` except `.env.example`, local/editor files, dependencies, and build output. The example contains names and empty/sample values, never actual credentials. Netlify environment variables are configured via its authenticated secret-management path; no hard-coded key in `netlify.toml`, GitHub workflow, or repository history.

## GitHub and Netlify

Existing remote is `https://github.com/dezolent/sry4u.git`; the local repository has no commits and many user-provided staged assets. Preserve those assets and staged content. Establish an initial reviewed commit without secrets, then push the authorized site changes to the existing repository.

Include reproducible package scripts and a lockfile, a GitHub CI build/test workflow, and `netlify.toml` specifying build command, output, functions, redirects, and headers. Configure continuous deployment from the existing GitHub repository using authenticated Netlify access. If account access is unavailable, complete the local site, tests, repository configuration, and deployment instructions, and report the specific external connection step that remains. Do not claim the site is live or deployment linked until verified.

## Verification and completion criteria

1. Astro/TypeScript checks and production build succeed.
2. Every Song and Album has a generated route; all album references, image URLs, platform mappings, Markdown links, and sitemap entries resolve.
3. Events tests cover valid events, expired events, cancellation, missing ticket offers, empty responses, malformed responses, timeouts, and upstream failures. Inspect a real API response without revealing its key.
4. Browser checks at narrow mobile and desktop sizes cover navigation, hero controls, filter/search/reset/query-state, fanlink opening, lightbox mouse/keyboard/focus behavior, EPK download, and 404.
5. Accessibility checks plus manual keyboard review; verify reduced-motion/pause behavior and no horizontal overflow.
6. Inspect JSON-LD, canonical and sharing metadata, sitemap, robots, llms, and Markdown endpoints against rendered content.
7. Inspect built output and staged changes for API-key leakage. Check security headers and test the deployed event endpoint when deployment is available.
8. Verify repository push, Netlify Git connection, deployment, and production URL before reporting those outcomes. Separate any unavailable external account access from completed implementation.

## Decisions still supplied through configuration

- Real merchandise store URL: use the working email interest CTA until provided.
- Analytics measurement ID: analytics remains disabled until configured.
- Netlify account/site access and final domain attachment: require existing authenticated access or the user's account connection when unavailable.

These do not block the core build. The visual direction and technical design above are ready for user review before implementation planning.
