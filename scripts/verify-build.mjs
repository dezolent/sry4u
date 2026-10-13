import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';import crypto from 'node:crypto';import {songs} from '../src/data/songs.ts';import {albums} from '../src/data/albums.ts';
await assert.rejects(fs.access('public/images/optimized'),{code:'ENOENT'});
const root='dist';const sitemap=await fs.readFile(`${root}/sitemap-0.xml`,'utf8');const headers=await fs.readFile(`${root}/_headers`,'utf8');
function verifySharingImage(html,route){
 const image='https://sry4u.com/images/og-sry4u.jpg';
 assert.ok(html.includes(`property="og:image" content="${image}"`),`Default OG image: ${route}`);
 assert.ok(html.includes(`name="twitter:image" content="${image}"`),`Default Twitter image: ${route}`);
 assert.equal([...html.matchAll(/property="og:image"/g)].length,1,`Single OG image: ${route}`);
 for(const [property,value] of [['type','image/jpeg'],['width','1200'],['height','630']])assert.ok(html.includes(`property="og:image:${property}" content="${value}"`),`OG image ${property}: ${route}`);
}
await fs.access(`${root}/images/og-sry4u.jpg`);
async function verifyPage(route,title){
 const file=route==='/'?'index.html':`${route.replace(/^\//,'')}index.html`;const html=await fs.readFile(path.join(root,file),'utf8');
 assert.ok(html.includes('<title>')&&html.includes(title),`Title: ${route}`);
 assert.ok(html.includes(`href="https://sry4u.com${route}"`),`Canonical: ${route}`);
 verifySharingImage(html,route);
 assert.ok(!html.includes('/images/optimized/'),`Obsolete image path: ${route}`);
 assert.ok(html.includes('src="/_astro/'),`Astro image output: ${route}`);
 for(const [_,attrs,body]of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
  if(attrs.includes('application/ld+json')){const graph=JSON.parse(body);assert.equal(graph['@context'],'https://schema.org');}
  else if(!/src=|application\/json/.test(attrs)&&body){assert.ok(headers.includes(crypto.createHash('sha256').update(body).digest('base64')),`Inline script CSP: ${route}`);}
 }
 for(const [_,src]of html.matchAll(/(?:\bsrc|data-full)="([^"]+)"/g)){if(src.startsWith('/'))await fs.access(path.join(root,decodeURIComponent(src)));}
 for(const [_,set]of html.matchAll(/\bsrcset="([^"]+)"/g))for(const candidate of set.split(',')){const src=candidate.trim().split(/\s+/)[0];if(src.startsWith('/'))await fs.access(path.join(root,decodeURIComponent(src)));}
 assert.ok(sitemap.includes(`https://sry4u.com${route}`),`Sitemap: ${route}`);
 return html;
}
await verifyPage('/','SRY4U');await verifyPage('/music/','Music');await verifyPage('/epk/','Electronic Press Kit');
for(const song of songs){const html=await verifyPage(`/music/${song.id}/`,'SRY4U');assert.ok(html.includes(song.title.replace(/&/g,'&amp;'))||html.includes(song.title));const md=await fs.readFile(`${root}/music/${song.id}.md`,'utf8');assert.ok(md.includes(song.title));for(const link of song.streamingLinks||[])assert.ok(md.includes(link.url));}
for(const album of albums){await verifyPage(`/music/albums/${album.id}/`,'SRY4U');await fs.access(`${root}/music/albums/${album.id}.md`);for(const id of album.songIds)assert.ok(songs.some(s=>s.id===id));}
for(const name of ['index.md','music.md','epk.md','robots.txt','llms.txt','404.html'])await fs.access(`${root}/${name}`);
assert.ok(!(await fs.readFile(`${root}/404.html`,'utf8')).includes('name="robots" content="index'));
verifySharingImage(await fs.readFile(`${root}/404.html`,'utf8'),'/404/');
assert.ok(!sitemap.includes('404'));assert.ok(!sitemap.includes('/api/'));assert.ok(!sitemap.includes('.md'));
// Match secret values without ever printing them or the matching file contents.
try{
 const env=await fs.readFile('.env','utf8');const match=env.match(/^BANDSINTOWN_API_KEY\s*=\s*["']?([^\s"']+)/m);
 if(match){const key=match[1];async function scan(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())await scan(f);else if(/\.(html|js|mjs|json|txt|md|xml)$/.test(f))assert.ok(!(await fs.readFile(f,'utf8')).includes(key),`Secret found in public output: ${f}`);}}await scan(root);}
}catch(e){if(e.code!=='ENOENT')throw e;}
console.log(`Verified ${songs.length} song routes, ${albums.length} EP routes, core pages, images, canonicals, JSON-LD, Markdown, sitemap, CSP and secret isolation.`);
