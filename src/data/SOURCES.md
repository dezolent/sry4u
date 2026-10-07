# SRY4U catalog sources

Checked October 6, 2026, America/New_York (October 7 UTC).

## Coverage

- [Spotify artist](https://open.spotify.com/artist/3rhxTfOddogUBPD8eVNGtl): all six singles exposed in the public artist page, each checked against its individual album page. No albums, compilations or appearances were exposed. Public-page coverage is not a guarantee of every historical, private or region-restricted release.
- [SoundCloud artist](https://soundcloud.com/sry4u): all 16 public uploads, matching the profile's track count. Followed the tracks pagination link to an empty final page.
- All five public playlists inspected. Two are marked as EPs; three are ordinary playlists and are not treated as albums.
- Three additional tracks hosted by XOTIX, Ridence and K!NDLY were retrieved from the artist's playlists.
- Combined total: 20 unique tracks (including ATONEMENT SESSION VOL. 1, a DJ mix), six Spotify links, 19 SoundCloud links, and two EPs. Five tracks occur on both platforms.

## Field conventions

- `sources.json` records original per-platform dates, durations, credits, artwork and release URLs for every track.
- Spotify release date, duration and largest supplied artwork URL take precedence for matched tracks. Otherwise, SoundCloud's explicit release date or public `display_date` is used. Upload `created_at` is not assumed to be the release date. Dates retain the source calendar date without timezone conversion.
- CHROMVTIK F33LING: Spotify date 2026-04-16; SoundCloud public date 2026-04-17. Both are retained in sources.json.
- Confession Tapes Vol. 1 has an explicit SoundCloud release date of 2026-08-15, although its playlist was created on August 18 and some constituent tracks appeared later. The source date is preserved, not corrected speculatively.
- ETERNAL HOUR EP has an explicit release date of 2025-12-04, despite an earlier playlist creation date.
- Duration uses full-track milliseconds truncated to M:SS, never preview duration.
- Original artists and named remixers/co-artists are represented using `artist` and `collaborators`. These credits are based on the release title; they do not imply that an unofficial flip was commissioned by the original artist. No featured-performer role is inferred without explicit evidence.
- SoundCloud genres are preserved. SCUM has `genres: []` because the inspected Spotify metadata does not supply a genre. Other optional unknown fields are omitted.
- RAMSHACK's ISRC QZS652542301 is supplied by SoundCloud. SLAYER's publisher metadata contains `199811217766`, which is not a valid ISRC format; it is retained only in sources.json. No ISWCs were found.
- `freeDownload` uses the artist-supplied external download gate. These links may require actions or change availability; download completion was not tested. Smoked My Brain Away's description warns that its gate is broken; the current purchase URL is preserved.
- Artwork uses actual remote CDN URLs, so no nonexistent local cover paths are introduced. SoundCloud URLs retain the source-provided image size.
- Profile/social/contact details come from the user, except the biography, which is the current Spotify biography. Existing local platform/social logo paths have been preserved.

## Historical result excluded from the current catalog

A [search-indexed No Broke Boys flip](https://m.soundcloud.com/sry4u/disco-lines-tinashe-sry4u-flip-final) reports the title “DISCO LINES & TINASHE - No Broke Boys (SRY4U FLIP)”, date 2025-07-02, duration 2:51 and genre Dubstep. Its current desktop URL no longer returns track metadata and it is absent from the 16 public uploads. It is documented here rather than presented as a currently available release. Search-index dates for other uploads can also predate their current public display dates.

## Use

Import `songs` from `src/data/songs.ts` and `albums` from `src/data/albums.ts`. The interfaces match the requested schema. Album `songIds` resolve to song IDs in songs.ts. Singles remain songs, since the supplied Album type has no single-release variant.
