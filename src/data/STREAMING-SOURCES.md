# Streaming recording sources

Checked **2026-10-20** (America/New_York). Scope: the six recordings already carrying Spotify track links in `songs.ts`. Existing catalog metadata, ordering, downloads, flips, and SoundCloud links are preserved. This adds 41 links to these six recordings, bringing them to 52 links across 11 streaming services. A follow-up adds one Amazon Music link to the historical Spotify candidate Smoked My Brain Away: **42 new links, 54 links across the seven investigated recordings** (52 for the six currently confirmed Spotify tracks, plus SoundCloud and Amazon Music for Smoked).

## Matching method

- Started with each exact Spotify track ID and read the public [Odesli/song.link](https://song.link/) page: its `__NEXT_DATA__.props.pageProps.pageData.entityData` provides title, artist credits, duration and ISRC; `sections[].links[]` provides mapped platform URLs and recording IDs. Only entries with a concrete `url` were eligible. Empty platform placeholders are not evidence of availability.
- The former public API `/v1-alpha.1/links` returned HTTP 401, `PUBLIC_API_ACCESS_DEPRECATED`. Public song.link HTML remains readable. Apple-ID resolver lookups for CHROMVTIK F33LING, SLAYER and MARKED 4 DEATH supplied no additional missing services.
- Independently read official Apple Music album HTML (`music:song` URL and `music:song:duration`), YouTube watch-page `videoDetails` (title, artist, exact seconds, release date, distributor), YouTube Music canonical/OG title/artist metadata, and the five existing SoundCloud pages (`__sc_hydration`, recording ID, title and duration).
- Official Deezer API records match title, credited artists, ISRC, date and whole-second duration for all six tracks, with `readable: true`. CHROMVTIK F33LING and SLAYER were discovered via `/track/isrc:ISRC` because the resolver omitted their Deezer matches.
- Official Tidal track JSON-LD independently confirms the four included Tidal recordings by title, artists, duration and ISRC. Official Pandora page data independently confirms all five included Pandora matches by title, artist, duration and ISRC. Amazon Music, Yandex Music and Anghami links are supported by the exact Spotify-recording resolver mapping; the latter two are not independently verified against official track metadata. Anghami returned a client challenge during direct inspection.
- No audio fingerprinting or authenticated playback was performed. Durations may differ by one second between truncated/rounded service displays; SCUM, for example, is 158.896 seconds in the Spotify mapping, 158 seconds in Apple/Deezer displays and 159 seconds on YouTube/Tidal. Artist/title/release/ISRC evidence identifies the recording. Resolver `releaseDate.month` values are zero-based; existing ISO release dates are preserved.

## Coverage

| Recording | Spotify | SoundCloud | Apple Music | YouTube | YouTube Music | Deezer | Tidal | Amazon Music | Pandora | Other | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CHROMVTIK F33LING | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yandex Music | 10 |
| SLAYER | Yes | Yes | Yes | Yes | Yes | Yes | Unconfirmed | Yes | Unconfirmed | — | 7 |
| MARKED 4 DEATH | Yes | Yes | Yes | Yes | Yes | Yes | Unconfirmed | Yes | Yes | — | 8 |
| FACE OF ROT | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | — | 9 |
| RAMSHACK | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | — | 9 |
| SCUM | Yes | Unconfirmed | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Anghami | 9 |

## Recording provenance

### CHROMVTIK F33LING

Resolver source: [https://song.link/s/6CY9JbAyJihDduAkBiFJBk](https://song.link/s/6CY9JbAyJihDduAkBiFJBk). Spotify ID `6CY9JbAyJihDduAkBiFJBk`; ISRC `USLZJ2698656`; credited artists **SRY4U**; duration **130285 ms**.

| Service | Recording URL / ID | Evidence |
| --- | --- | --- |
| Spotify | [https://open.spotify.com/track/6CY9JbAyJihDduAkBiFJBk](https://open.spotify.com/track/6CY9JbAyJihDduAkBiFJBk) | Existing exact Spotify seed |
| SoundCloud | [https://soundcloud.com/sry4u/chromvtik-f33ling-1](https://soundcloud.com/sry4u/chromvtik-f33ling-1) | Official track hydration, SoundCloud ID `2304608471`; matching title/credits/duration |
| Apple Music | [https://music.apple.com/us/song/chromvtik-f33ling/1890195109](https://music.apple.com/us/song/chromvtik-f33ling/1890195109) | Official Apple single page `music:song` and duration; [artist catalog](https://music.apple.com/us/artist/sry4u/1800672495) |
| YouTube | [https://www.youtube.com/watch?v=t22mu5-e6KM](https://www.youtube.com/watch?v=t22mu5-e6KM) | Official watch-page `videoDetails`; Symphonic Distribution auto-generated recording, matching date/credits/duration |
| YouTube Music | [https://music.youtube.com/watch?v=t22mu5-e6KM](https://music.youtube.com/watch?v=t22mu5-e6KM) | Official canonical URL, OG title and artist credits; same video ID as verified YouTube recording |
| Deezer | [https://www.deezer.com/track/3938353061](https://www.deezer.com/track/3938353061) | [Official API record](https://api.deezer.com/track/3938353061); title/artists/ISRC/date/duration match, readable |
| Amazon Music | [https://music.amazon.com/albums/B0GVT8NMTP?trackAsin=B0GVTGKY5V](https://music.amazon.com/albums/B0GVT8NMTP?trackAsin=B0GVTGKY5V) | Exact Spotify-recording resolver mapping; track ASIN in URL (not the album alone) |
| Tidal | [https://listen.tidal.com/track/512560281](https://listen.tidal.com/track/512560281) | [Official Tidal JSON-LD](https://tidal.com/track/512560281); title/artists/ISRC/duration match; resolver mapping |
| Pandora | [https://www.pandora.com/TR:200340725](https://www.pandora.com/TR:200340725) | Official page data title/artists/ISRC/duration match; resolver mapping |
| Yandex Music | [https://music.yandex.ru/track/150165193](https://music.yandex.ru/track/150165193) | Exact Spotify-recording resolver mapping; resolver country RU |

### SLAYER

Resolver source: [https://song.link/s/0IaNcyF9h7hbH2EsnxvnI0](https://song.link/s/0IaNcyF9h7hbH2EsnxvnI0). Spotify ID `0IaNcyF9h7hbH2EsnxvnI0`; ISRC `QZYB42547374`; credited artists **SRY4U, K!NDLY**; duration **195000 ms**.

| Service | Recording URL / ID | Evidence |
| --- | --- | --- |
| Spotify | [https://open.spotify.com/track/0IaNcyF9h7hbH2EsnxvnI0](https://open.spotify.com/track/0IaNcyF9h7hbH2EsnxvnI0) | Existing exact Spotify seed |
| SoundCloud | [https://soundcloud.com/kindlymusic/k-ndly-sry4u-slayer](https://soundcloud.com/kindlymusic/k-ndly-sry4u-slayer) | Official track hydration, SoundCloud ID `2133282174`; matching title/credits/duration |
| Apple Music | [https://music.apple.com/us/song/slayer/1855914698](https://music.apple.com/us/song/slayer/1855914698) | Official Apple single page `music:song` and duration; [artist catalog](https://music.apple.com/us/artist/sry4u/1800672495) |
| YouTube | [https://www.youtube.com/watch?v=wFaD3plBq6E](https://www.youtube.com/watch?v=wFaD3plBq6E) | Official watch-page `videoDetails`; Repost Network / GLEESH MOB auto-generated recording, matching date/credits/duration |
| YouTube Music | [https://music.youtube.com/watch?v=wFaD3plBq6E](https://music.youtube.com/watch?v=wFaD3plBq6E) | Official canonical URL, OG title and artist credits; same video ID as verified YouTube recording |
| Deezer | [https://www.deezer.com/track/3677834882](https://www.deezer.com/track/3677834882) | [Official API record](https://api.deezer.com/track/3677834882); title/artists/ISRC/date/duration match, readable |
| Amazon Music | [https://music.amazon.com/albums/B0G3Y5WX5V?trackAsin=B0G3Y5ZDXD](https://music.amazon.com/albums/B0G3Y5WX5V?trackAsin=B0G3Y5ZDXD) | Exact Spotify-recording resolver mapping; track ASIN in URL (not the album alone) |

### MARKED 4 DEATH

Resolver source: [https://song.link/s/7opYmpnhB8kLdKNoA4tYAL](https://song.link/s/7opYmpnhB8kLdKNoA4tYAL). Spotify ID `7opYmpnhB8kLdKNoA4tYAL`; ISRC `QZHPJ2566396`; credited artists **SRY4U**; duration **178285 ms**.

| Service | Recording URL / ID | Evidence |
| --- | --- | --- |
| Spotify | [https://open.spotify.com/track/7opYmpnhB8kLdKNoA4tYAL](https://open.spotify.com/track/7opYmpnhB8kLdKNoA4tYAL) | Existing exact Spotify seed |
| SoundCloud | [https://soundcloud.com/sry4u/84abd9c6-aff4-49ed-8b42-19858983b9fa](https://soundcloud.com/sry4u/84abd9c6-aff4-49ed-8b42-19858983b9fa) | Official track hydration, SoundCloud ID `2191712511`; matching title/credits/duration |
| Apple Music | [https://music.apple.com/us/song/marked-4-death/1845666622](https://music.apple.com/us/song/marked-4-death/1845666622) | Official Apple single page `music:song` and duration; [artist catalog](https://music.apple.com/us/artist/sry4u/1800672495) |
| YouTube | [https://www.youtube.com/watch?v=iXCUlg-_SkI](https://www.youtube.com/watch?v=iXCUlg-_SkI) | Official watch-page `videoDetails`; Repost Network / GLEESH MOB auto-generated recording, matching date/credits/duration |
| YouTube Music | [https://music.youtube.com/watch?v=iXCUlg-_SkI](https://music.youtube.com/watch?v=iXCUlg-_SkI) | Official canonical URL, OG title and artist credits; same video ID as verified YouTube recording |
| Deezer | [https://www.deezer.com/track/3598486362](https://www.deezer.com/track/3598486362) | [Official API record](https://api.deezer.com/track/3598486362); title/artists/ISRC/date/duration match, readable |
| Amazon Music | [https://music.amazon.com/albums/B0FVVNDJ2D?trackAsin=B0FVVPH8VW](https://music.amazon.com/albums/B0FVVNDJ2D?trackAsin=B0FVVPH8VW) | Exact Spotify-recording resolver mapping; track ASIN in URL (not the album alone) |
| Pandora | [https://www.pandora.com/TR:176193939](https://www.pandora.com/TR:176193939) | Official page data title/artists/ISRC/duration match; resolver mapping |

### FACE OF ROT

Resolver source: [https://song.link/s/57ENrP9t6uPRKPabKRbrmd](https://song.link/s/57ENrP9t6uPRKPabKRbrmd). Spotify ID `57ENrP9t6uPRKPabKRbrmd`; ISRC `QZJRC2570616`; credited artists **SRY4U**; duration **163265 ms**.

| Service | Recording URL / ID | Evidence |
| --- | --- | --- |
| Spotify | [https://open.spotify.com/track/57ENrP9t6uPRKPabKRbrmd](https://open.spotify.com/track/57ENrP9t6uPRKPabKRbrmd) | Existing exact Spotify seed |
| SoundCloud | [https://soundcloud.com/sry4u/face-of-rot-final-vwav](https://soundcloud.com/sry4u/face-of-rot-final-vwav) | Official track hydration, SoundCloud ID `2168539119`; matching title/credits/duration |
| Apple Music | [https://music.apple.com/us/song/face-of-rot/1838118152](https://music.apple.com/us/song/face-of-rot/1838118152) | Official Apple single page `music:song` and duration; [artist catalog](https://music.apple.com/us/artist/sry4u/1800672495) |
| YouTube | [https://www.youtube.com/watch?v=c8FgVLU2_sA](https://www.youtube.com/watch?v=c8FgVLU2_sA) | Official watch-page `videoDetails`; Repost Network / GLEESH MOB auto-generated recording, matching date/credits/duration |
| YouTube Music | [https://music.youtube.com/watch?v=c8FgVLU2_sA](https://music.youtube.com/watch?v=c8FgVLU2_sA) | Official canonical URL, OG title and artist credits; same video ID as verified YouTube recording |
| Deezer | [https://www.deezer.com/track/3543920151](https://www.deezer.com/track/3543920151) | [Official API record](https://api.deezer.com/track/3543920151); title/artists/ISRC/date/duration match, readable |
| Amazon Music | [https://music.amazon.com/albums/B0FQ2LQ5WH?trackAsin=B0FQ2MTJKJ](https://music.amazon.com/albums/B0FQ2LQ5WH?trackAsin=B0FQ2MTJKJ) | Exact Spotify-recording resolver mapping; track ASIN in URL (not the album alone) |
| Tidal | [https://listen.tidal.com/track/458968382](https://listen.tidal.com/track/458968382) | [Official Tidal JSON-LD](https://tidal.com/track/458968382); title/artists/ISRC/duration match; resolver mapping |
| Pandora | [https://www.pandora.com/TR:171280471](https://www.pandora.com/TR:171280471) | Official page data title/artists/ISRC/duration match; resolver mapping |

### RAMSHACK

Resolver source: [https://song.link/s/2ygH7MdUU4dxSXrUaT4dR4](https://song.link/s/2ygH7MdUU4dxSXrUaT4dR4). Spotify ID `2ygH7MdUU4dxSXrUaT4dR4`; ISRC `QZS652542301`; credited artists **SRY4U, E4RC**; duration **172159 ms**.

| Service | Recording URL / ID | Evidence |
| --- | --- | --- |
| Spotify | [https://open.spotify.com/track/2ygH7MdUU4dxSXrUaT4dR4](https://open.spotify.com/track/2ygH7MdUU4dxSXrUaT4dR4) | Existing exact Spotify seed |
| SoundCloud | [https://soundcloud.com/sry4u/ramshack](https://soundcloud.com/sry4u/ramshack) | Official track hydration, SoundCloud ID `2074933224`; matching title/credits/duration; ISRC matches |
| Apple Music | [https://music.apple.com/us/song/ramshack/1830397010](https://music.apple.com/us/song/ramshack/1830397010) | Official Apple single page `music:song` and duration; [artist catalog](https://music.apple.com/us/artist/sry4u/1800672495) |
| YouTube | [https://www.youtube.com/watch?v=DspCuHPvWic](https://www.youtube.com/watch?v=DspCuHPvWic) | Official watch-page `videoDetails`; Repost Network / GLEESH MOB auto-generated recording, matching date/credits/duration |
| YouTube Music | [https://music.youtube.com/watch?v=DspCuHPvWic](https://music.youtube.com/watch?v=DspCuHPvWic) | Official canonical URL, OG title and artist credits; same video ID as verified YouTube recording |
| Deezer | [https://www.deezer.com/track/3487246161](https://www.deezer.com/track/3487246161) | [Official API record](https://api.deezer.com/track/3487246161); title/artists/ISRC/date/duration match, readable |
| Amazon Music | [https://music.amazon.com/albums/B0FKSPWBDP?trackAsin=B0FKT8C2Q7](https://music.amazon.com/albums/B0FKSPWBDP?trackAsin=B0FKT8C2Q7) | Exact Spotify-recording resolver mapping; track ASIN in URL (not the album alone) |
| Tidal | [https://listen.tidal.com/track/451527515](https://listen.tidal.com/track/451527515) | [Official Tidal JSON-LD](https://tidal.com/track/451527515); title/artists/ISRC/duration match; resolver mapping |
| Pandora | [https://www.pandora.com/TR:168139678](https://www.pandora.com/TR:168139678) | Official page data title/artists/ISRC/duration match; resolver mapping |

### SCUM

Resolver source: [https://song.link/s/458bLGeZV6kwmoumXr5YXL](https://song.link/s/458bLGeZV6kwmoumXr5YXL). Spotify ID `458bLGeZV6kwmoumXr5YXL`; ISRC `QZMHK2522660`; credited artists **SRY4U**; duration **158896 ms**.

| Service | Recording URL / ID | Evidence |
| --- | --- | --- |
| Spotify | [https://open.spotify.com/track/458bLGeZV6kwmoumXr5YXL](https://open.spotify.com/track/458bLGeZV6kwmoumXr5YXL) | Existing exact Spotify seed |
| Apple Music | [https://music.apple.com/us/song/scum/1803072795](https://music.apple.com/us/song/scum/1803072795) | Official Apple single page `music:song` and duration; [artist catalog](https://music.apple.com/us/artist/sry4u/1800672495) |
| YouTube | [https://www.youtube.com/watch?v=aHFYtXaCqSk](https://www.youtube.com/watch?v=aHFYtXaCqSk) | Official watch-page `videoDetails`; Repost Network / GLEESH MOB auto-generated recording, matching date/credits/duration |
| YouTube Music | [https://music.youtube.com/watch?v=aHFYtXaCqSk](https://music.youtube.com/watch?v=aHFYtXaCqSk) | Official canonical URL, OG title and artist credits; same video ID as verified YouTube recording |
| Deezer | [https://www.deezer.com/track/3267428481](https://www.deezer.com/track/3267428481) | [Official API record](https://api.deezer.com/track/3267428481); title/artists/ISRC/date/duration match, readable |
| Amazon Music | [https://music.amazon.com/albums/B0DZNZV5BX?trackAsin=B0DZP12RKJ](https://music.amazon.com/albums/B0DZNZV5BX?trackAsin=B0DZP12RKJ) | Exact Spotify-recording resolver mapping; track ASIN in URL (not the album alone) |
| Tidal | [https://listen.tidal.com/track/422448065](https://listen.tidal.com/track/422448065) | [Official Tidal JSON-LD](https://tidal.com/track/422448065); title/artists/ISRC/duration match; resolver mapping |
| Pandora | [https://www.pandora.com/TR:153256343](https://www.pandora.com/TR:153256343) | Official page data title/artists/ISRC/duration match; resolver mapping |
| Anghami | [https://play.anghami.com/song/1202829153?refer=linktree](https://play.anghami.com/song/1202829153?refer=linktree) | Exact Spotify-recording resolver mapping; direct page requires client challenge |

## Unresolved and intentionally excluded

- **SCUM — SoundCloud:** no exact public recording was confirmed in the official artist track listing or public search. The candidate `/sry4u/scum` did not return track metadata. No guessed URL was added. The other five SoundCloud links were rechecked and retained.
- **SLAYER and MARKED 4 DEATH — Tidal:** no concrete track URL was returned by Spotify/Apple resolver lookups, and no matching official track page was confirmed during this pass. This is an unconfirmed match, not a claim that these releases are unavailable.
- **SLAYER — Pandora:** no concrete recording URL was returned or independently confirmed.
- No verified exact recordings were confirmed on Bandcamp, Beatport, Qobuz, Audiomack, Audius, Napster, Boomplay or other services in this pass. Empty resolver placeholders and search result pages were excluded. Catalog-wide completeness across every streaming service cannot be inferred from this public-source pass.
- Resolver Amazon store/iTunes purchase destinations were excluded from streaming buttons. Artist pages, search URLs, unofficial reposts, live sets and source originals of flips were excluded.
- Existing SoundCloud SLAYER publisher metadata puts a 12-digit value in its `isrc` field; that field was not used as an ISRC match. The official Deezer and Spotify resolver ISRC is `QZYB42547374`.

## Follow-up: Smoked My Brain Away Spotify candidate

Checked **2026-10-20** after noticing the label “Smoked My Brain Away - Single by SRY4U | Spotify” on the artist's [Linktree](https://linktr.ee/sry4u). The label survives inside the account's generated historical biography (`account.userGeneratedBio`). The current live `links[]` contains 19 entries and has no Smoked My Brain Away item; `pinnedLinks[]` and `integrations[]` are empty. Upper/lowercase profile URLs and the US-country variant give the same result. **There is no current outgoing Spotify URL attached to that historical label to retrieve.** This is a removed link, not a verified currently playable Spotify recording.

The [official Spotify artist page](https://open.spotify.com/artist/3rhxTfOddogUBPD8eVNGtl) currently exposes the six singles documented above and contains no Smoked My Brain Away title. The [Apple artist catalog](https://music.apple.com/us/artist/sry4u/1800672495) likewise lists those six. Public exact-title/artist web searches did not recover a Spotify track or album ID; Spotify's public search HTML supplies no recording results without client execution, so this search is not proof of worldwide absence.

The existing [official SoundCloud recording](https://soundcloud.com/sry4u/smokedmybrainaway) is confirmed: track ID **2255406194**, artist **SRY4U**, duration **189336 ms**, display date **2026-02-19**. Its description says it was inspired by A$AP Rocky's “I Smoked Away My Brain”; that original is not a valid substitute. The [SoundCloud-seeded resolver](https://song.link/sc/2255406194) and reverse [Tidal-seeded resolver](https://song.link/t/498744030) and [Amazon-seeded resolver](https://song.link/a/B0GN94SLCW) associate the same 189-second SRY4U recording with these historical records, but return **no concrete Spotify or Apple Music URL**:

| Service | Exact historical recording | Verification / current limitation |
| --- | --- | --- |
| Deezer | [3842568571](https://www.deezer.com/track/3842568571) | [Official ISRC lookup](https://api.deezer.com/track/isrc:QT6Y22507100) confirms title, SRY4U, ISRC **QT6Y22507100**, duration 189 seconds and release **2026-02-19**; **`readable: false`**, so excluded from streaming buttons. |
| Pandora | [TR:193205389](https://www.pandora.com/TR:193205389) | Official page data confirms title, SRY4U, ISRC **QT6Y22507100**, duration **189250 ms**, release **2026-02-19**; `rightsInfo` has `hasInteractive`, `hasOffline`, `hasNonInteractive`, `hasStatutory` and `hasRadioRights` all **false**; `hasRadio: false`. Excluded from streaming buttons. |
| Tidal | [498744030](https://listen.tidal.com/track/498744030) | Resolver metadata confirms SRY4U, ISRC **QT6Y22507100**, duration 189 seconds and release **2026-02-19**; official `/track/498744030`, `/browse/track/498744030` and `listen.tidal.com` pages return **Not Found - TIDAL** and “The requested content could not be found on TIDAL”; embed returns an error. Excluded from streaming buttons. |
| Amazon Music | [B0GN94SLCW](https://music.amazon.com/albums/B0GN8NQTCR?trackAsin=B0GN94SLCW) | Resolver metadata confirms title, SRY4U, duration 189 seconds and release **2026-02-19**; added as an exact-recording resolver-supported streaming link, consistent with the other Amazon links; direct inspection returned no usable recording metadata and authenticated playback was not verified. |

These findings are consistent with a withdrawn distributed release, but do not establish a removal reason or global availability. **No Spotify link was invented, and unavailable Deezer/Tidal/Pandora links were excluded. The song gains only the resolver-supported Amazon Music link; its existing SoundCloud/download links and catalog position remain intact.** Totals are now **42 new links**: 41 for the six currently confirmed Spotify recordings plus one for this historical candidate. The seven investigated recordings have **54 links** combined; the six currently confirmed Spotify recordings still have 52. Current Spotify availability remains unconfirmed and withdrawal is not proven.
