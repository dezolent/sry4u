import type { Album } from "./types";

/** Singles are represented in songs.ts; only verified EPs/albums belong here. */
export const albums: Album[] = [
  {
    "id": "confession-tapes-vol-1",
    "title": "Confession Tapes Vol. 1",
    "coverArt": "https://i1.sndcdn.com/artworks-P5mqpEQhWXJpBzGT-Db3VHQ-large.jpg",
    "releaseDate": "2026-08-15",
    "songIds": [
      "john-summit-chainsmokers-all-the-time-sry4u-x-bonkers-flip",
      "paramore-all-i-wanted-sry4u-flip",
      "adventure-club-yuna-gold-sry4u-flip",
      "dmx-x-gone-give-it-to-ya-sry4-x-mvtr-flip",
      "breathe-carolina-blackout-sry4u-flip",
      "tay-k-m-she-wrote-sry4u-flip",
      "zeds-dead-lost-you-sry4u-x-sin-gartner-flip"
    ],
    "albumType": "EPRelease",
    "streamingLinks": [
      {
        "platform": "SoundCloud",
        "url": "https://soundcloud.com/sry4u/sets/confession-tapes-vol-1"
      }
    ]
  },
  {
    "id": "eternal-hour-ep",
    "title": "ETERNAL HOUR EP",
    "coverArt": "https://i1.sndcdn.com/artworks-1aYwCEesNuxy7TXO-kHv8kg-large.jpg",
    "releaseDate": "2025-12-04",
    "songIds": [
      "face-of-rot",
      "marked-4-death",
      "slayer",
      "ramshack"
    ],
    "albumType": "EPRelease",
    "streamingLinks": [
      {
        "platform": "SoundCloud",
        "url": "https://soundcloud.com/sry4u/sets/2025-singles"
      }
    ]
  }
];
