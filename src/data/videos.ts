import {laTranscript,minnesotaTranscript} from './video-transcripts';

export interface Video {
 id:string;
 youtubeId:string;
 title:string;
 description:string;
 uploadDate:string;
 duration:string;
 kind:'DJ set'|'Tour diary';
 setlist?:string[];
 transcript?:{start:number;text:string}[];
}

// Titles, upload timestamps and durations verified against the official YouTube
// watch pages on 2026-10-20. Session 1.1's tracklist was supplied by the artist.
export const videos:Video[]=[
 {
  id:'atonement-fox-theatre',youtubeId:'Rm4InMsAwu8',
  title:'SRY4U — Atonement Session At The Fox Theatre',
  description:'Watch SRY4U’s Atonement set at the Fox Theatre in Boulder, Colorado, supporting Hostage Situation.',
  uploadDate:'2026-09-07T10:30:12-07:00',duration:'55:40',kind:'DJ set',
 },
 {
  id:'atonement-session-1-1',youtubeId:'j-G--DZSBrA',
  title:'Atonement Session 1.1',
  description:'Step inside Atonement Session 1.1 as SRY4U turns a living room into a venue for a full DJ set.',
  uploadDate:'2026-08-25T08:00:14-07:00',duration:'53:51',kind:'DJ set',
  setlist:[
   'SRY4U Massive Intro Edit Mystic Methods - War Pigs x NO - OFF x Warlord - Mr.',
   'Snazzy x llTYX - Knightout x Beastboi - Crunk',
   'Neotek ID x Grove St Edit',
   'MYTHM - Ruins x DVEIGHT - Tractor Sub (If I Die Spesh)',
   'MVRDA - Cessation x Digiwonk x Joke - Simon The Digger Bootleg (Gyronik Spesh)',
   'THRESH x Athens - Rock That Body (Remix)',
   'Addicted (Machaki Remix)',
   'Waterfalls (SRY4U Remix)',
   'In My Room (Phvra Remix)',
   'JAMZ - DEEPEND',
   'MORBEATO - Let U Go (ID)',
   'AKEOS & JUB - Duel (Pina Colada VIP) x Jackpot (JetFaze Flip)',
   'THA4SKAEN x SRY4U - FAHHH Combo x Svdden Death - SYFM',
   'INFEKT - Da Pit (Sisto Remix)',
   'EMORFIK ID x Mallard (PHOR Remix)',
   'SQISHI - SUXK MY SQISH (BEASTBOI & YUNG BEAZY VIP) x AKIRAH - F Ya',
   'Cinema (Madcore Flip)',
   'American Money (SRY4U Flip)',
   'VYSAR - Pressure',
   'Two Percent Opus x Rihanna Edit',
   'Machaki - Never Go',
   'Cobra Starship (GORILLA T & CELO Remix)',
   'KUMERA - CHACHARIDDIM x HAMRO - RIOT x XAE',
   'OPHION - Ophion Anthem x NO & ROI - OFFCORE x ROI - My Dick Hit The Mixer',
   'MYTHM & INFEKT - Unbroken',
   'AD & SHIVERZ - Semtex (SRY4U x Hostage Situation Remix)',
   'WARLORD - Mr. Snazzy Jogged Dub x STAYNS - Softer',
   'Missing (SRY4U x Ridence Remix)',
   'Body Final v3 (Costa Remix)',
   'I Wanna Go (Machaki Remix)',
   "Tape B - I Won't Be Your Drug (ITSYOURL0SS x BLOOM Flip)",
   'Schoolboy Q - That Part (Xotix x SRY4U Remix)',
   'KNOCK2 - Feel U Luv Me (Flozone & Machaki Flip)',
   'SRY4U - Good Time',
   'SRY4U - Chromatic Feeling',
   'SOLO Edit - Song Request x Evil Empire x BLVNKSPVCE - TLM',
   'The Resistance - Crystal Corruption',
   'AWEMINUS - Timmy x AUTOMHATE - Robot Dick',
   'TOXATE - Red Sky x Agrblockz (VMBRA Edit)',
   'MYTHM - Ashes',
   'SQISHI & SWEETTOOTH - Pucker Up x ONARA - Most Wanted',
   'This Is What Winter Feels Like (Paper Skies Remix)',
   'Paramore - Still Into You (TYNAN Flip)',
   'Frost Children - Falling (FRAXURE Remix)',
   'Katy B - Katy On A Mission (Two Percent Remix)',
   'John Summit & Julia Wolf - With Me (Mayetrix Flip)',
   'Breathe Carolina - Blackout (SRY4U Flip)',
   'Teddy Swims - Lose Control (Taken Hostage)',
   'Zeds Dead - Lost You (SRY4U x Sin Gaterner Flip)',
  ],
 },
 {
  id:'sry4u-chomp-take-la',youtubeId:'qQVPS3raHG0',
  title:'SRY4U & CHOMP TAKE LA',
  description:'Follow SRY4U and CHOMP behind the scenes of their Los Angeles debuts at XIHILO’s OBLIVION on July 31, 2026.',
  uploadDate:'2026-08-13T17:00:29-07:00',duration:'5:03',kind:'Tour diary',transcript:laTranscript,
 },
 {
  id:'sanzu-minnesota',youtubeId:'CgM4x53cGAc',
  title:'They Let ME Play with SANZU in Minnesota…',
  description:'Join SRY4U for a Minnesota tour diary capturing the trip, backstage moments, and a show with SANZU.',
  uploadDate:'2025-04-12T10:43:55-07:00',duration:'4:41',kind:'Tour diary',transcript:minnesotaTranscript,
 },
];

export const videoPath=(video:Video)=>`/videos/${video.id}/`;
export const videoThumbnail=(video:Video)=>`/images/video-thumbnails/${video.id}.jpg`;
export const youtubeUrl=(video:Video)=>`https://www.youtube.com/watch?v=${video.youtubeId}`;
export const videoEmbed=(video:Video)=>`https://www.youtube-nocookie.com/embed/${video.youtubeId}`;
