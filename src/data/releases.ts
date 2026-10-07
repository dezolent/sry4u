import coverPaths from './cover-paths.json' with {type:'json'};
import {songs} from './songs';import {albums} from './albums';
export const sortedSongs=[...songs].sort((a,b)=>b.releaseDate.localeCompare(a.releaseDate));
export const cover=(id:string)=>{const source=(coverPaths as Record<string,string>)[id];if(!source)throw new Error(`Missing cover source: ${id}`);return source;};
export const releases=[...sortedSongs.map(s=>({...s,category:s.id==='atonement-session-vol-1'?'mix':'track',href:`/music/${s.id}/`})),...albums.map(a=>({...a,artist:'SRY4U',genres:[] as string[],duration:'',category:'ep',href:`/music/albums/${a.id}/`}))].sort((a,b)=>b.releaseDate.localeCompare(a.releaseDate));
