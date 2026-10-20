# Video sources

Checked October 20, 2026 against the official [SRY4U Videos tab](https://www.youtube.com/@SRY4U_MUSIC/videos). This tab lists four uploads; releases and Shorts are separate surfaces and are outside this collection.

| Video | Source | Upload date | Duration |
| --- | --- | --- | --- |
| SRY4U — Atonement Session At The Fox Theatre | https://www.youtube.com/watch?v=Rm4InMsAwu8 | 2026-09-07 | 55:40 |
| Atonement Session 1.1 | https://www.youtube.com/watch?v=j-G--DZSBrA | 2026-08-25 | 53:51 |
| SRY4U & CHOMP TAKE LA | https://www.youtube.com/watch?v=qQVPS3raHG0 | 2026-08-13 | 5:03 |
| They Let ME Play with SANZU in Minnesota… | https://www.youtube.com/watch?v=CgM4x53cGAc | 2025-04-12 | 4:41 |

Titles, upload timestamps with timezone, embed availability, and durations come from public YouTube player metadata (`videoDetails`, `playerMicroformatRenderer`). Durations use `videoDetails.lengthSeconds`; YouTube's UI may round up a second. Brief site descriptions are summaries of each upload's own description, not generated claims about unseen footage. Thumbnails are the original `maxresdefault.jpg` images from YouTube's `i.ytimg.com` host, stored locally for stable crawlable URLs.

The user supplied all 49 Session 1.1 tracklist entries in the task request. Preserve their spelling and sequence, including the first two entries as supplied. Do not infer timestamps or resolve IDs. The Fox Theatre upload description does not publish a tracklist, and no full verified list was discovered; the watch page says it is unavailable.

The LA and Minnesota transcripts were read from YouTube's public **Show transcript** panels (English, auto-generated). The timed-text API returned empty responses. These are spoken excerpts covering the dialogue; music and lyric passages are omitted, source uncertainty/censored speech is preserved, and the public pages explicitly label their automatic-caption origin. Timestamps link to the corresponding YouTube moment. The two DJ sets use music-first presentations and set-list sections rather than presenting auto-detected song lyrics as spoken transcripts. The Fox Theatre upload exposes no caption track.

Schema follows [Google's VideoObject documentation](https://developers.google.com/search/docs/appearance/structured-data/video): name, thumbnailUrl, uploadDate, description, duration, and embedUrl. Watch URLs are `sameAs`, never `contentUrl` (which is for an actual media file). Each watch page connects its canonical page node to the video via `mainEntity` and `mainEntityOfPage`. No fabricated clip timestamps, audience counts, or live-broadcast status are emitted. Production CSP permits only `www.youtube-nocookie.com` as the external frame host.

Playback follow-up: the numeric local origin `http://127.0.0.1:4321/` produced YouTube's `UNPLAYABLE` / “This video is unavailable” response, despite a correct HTTP Referer and `playableInEmbed: true` watch-page metadata. The exact same embed loaded and played at `http://localhost:4321/`, verified in the browser with elapsed playback time. Switching embed hosts or adding an origin parameter did not resolve the numeric-host failure. Use the hostname-based local preview; do not spoof a production Referer or change video IDs to mask this external rejection.
