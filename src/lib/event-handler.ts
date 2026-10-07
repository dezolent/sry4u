import {fetchEvents} from './events.ts';import type {EventFeed} from './events.ts';
interface HandlerOptions {key?:()=>string|undefined;now?:()=>Date;fetcher?:typeof fetch;}
/** Shared by Astro's local endpoint and the deployed Netlify function. */
export function createEventHandler(options:HandlerOptions={}){
 let cached:EventFeed|undefined;let until=0;
 return async():Promise<Response>=>{
  const now=options.now?.()||new Date();
  if(!cached||+now>=until){cached=await fetchEvents({key:options.key?.()??process.env.BANDSINTOWN_API_KEY,now,fetcher:options.fetcher});until=+now+(cached.status==='ok'?300000:15000);}
  const feed={...cached,events:cached.events.filter(e=>Date.parse(e.expiresAt)>+now)};
  return new Response(JSON.stringify(feed),{status:feed.status==='ok'?200:503,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':feed.status==='ok'?'public, max-age=0, s-maxage=60':'no-store','X-Content-Type-Options':'nosniff'}});
 };
}
