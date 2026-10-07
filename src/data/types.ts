export interface StreamingLink {
  platform: string;
  url: string;
}

export interface Song {
  id: string;
  title: string;
  releaseDate: string;
  coverArt: string;
  genres: string[];
  duration: string;
  artist?: string;
  collaborators?: string[];
  features?: string[];
  isrc?: string;
  iswc?: string;
  streamingLinks?: StreamingLink[];
  /** External free download URL */
  freeDownload?: string;
}

export interface Album {
  id: string;
  title: string;
  coverArt: string;
  releaseDate: string;
  songIds: string[];
  albumType?: "EPRelease" | "AlbumRelease";
  streamingLinks?: StreamingLink[];
}
