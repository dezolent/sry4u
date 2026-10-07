// Download one unmodified source file per release. Astro generates all display variants.
import fs from 'node:fs/promises';import sharp from 'sharp';
import {songs} from '../src/data/songs.ts';import {albums} from '../src/data/albums.ts';
const file='src/data/cover-paths.json';let paths={};
try{paths=JSON.parse(await fs.readFile(file,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
await fs.mkdir('public/images/covers',{recursive:true});
for(const release of [...songs,...albums]){
 if(paths[release.id]){try{await fs.access(`public${paths[release.id]}`);continue;}catch(error){if(error.code!=='ENOENT')throw error;}}
 const response=await fetch(release.coverArt,{signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error(`Cover download failed: ${release.id}`);
 const bytes=Buffer.from(await response.arrayBuffer());const {format}=await sharp(bytes).metadata();
 if(!['jpeg','png','webp','avif'].includes(format))throw new Error(`Unsupported cover format: ${release.id}`);
 const extension=format==='jpeg'?'jpg':format;const source=`/images/covers/${release.id}.${extension}`;
 await fs.writeFile(`public${source}`,bytes);paths[release.id]=source;
}
await fs.writeFile(file,JSON.stringify(paths,null,2)+'\n');console.log('Catalog source covers are ready. Astro handles optimization during build.');
