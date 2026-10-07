export interface Show {
 id: string; title: string; datetime: string; date: string; venue: string;
 city: string; region: string; country: string; url?: string; ticketUrl?: string; expiresAt: string;
}
export interface EventFeed { status: 'ok' | 'unavailable'; events: Show[]; checkedAt: string; }
export function safePublicUrl(value: unknown): string | undefined {
 if (typeof value !== 'string') return;
 try {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) return;
  for (const name of [...url.searchParams.keys()]) if (/^(app_id|api_key|key|access_token)$/i.test(name)) url.searchParams.delete(name);
  return url.href;
 } catch { return; }
}
function zonedInstant(datetime: string, timezone: string): number | undefined {
 try {
  const base = Date.parse(datetime + 'Z'); let guess = base;
  const fmt = new Intl.DateTimeFormat('en-CA', {timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
  for (let i=0;i<3;i++) {
   const parts=Object.fromEntries(fmt.formatToParts(new Date(guess)).map(p=>[p.type,p.value]));
   const rendered=Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);
   guess+=base-rendered;
  }
  return Number.isFinite(guess)?guess:undefined;
 } catch { return; }
}
export function normalizeEvents(raw: unknown, now = new Date()): Show[] {
 if (!Array.isArray(raw)) throw new Error('Invalid event response');
 const shows:Show[]=[]; let recognized=0;
 for (const item of raw) {
  if (!item || typeof item !== 'object') continue;
  const e=item as Record<string,any>;
  if(typeof e.datetime!=='string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})?$/.test(e.datetime) || !e.venue || typeof e.venue.name!=='string') continue;
  const date=e.datetime.slice(0,10);const validDate=new Date(date+'T00:00:00Z');
  if(!Number.isFinite(+validDate)||validDate.toISOString().slice(0,10)!==date)continue;
  const localClock=Date.parse(e.datetime.slice(0,19)+'Z');
  if(!Number.isFinite(localClock)||new Date(localClock).toISOString().slice(0,19)!==e.datetime.slice(0,19))continue;
  recognized++;
  if(e.cancelled===true || e.canceled===true || /^(cancelled|canceled)$/i.test(String(e.status||'')))continue;
  const explicit=/Z$|[+-]\d{2}:\d{2}$/.test(e.datetime);
  const timezone=e.timezone||e.venue.timezone;
  const exact=explicit?Date.parse(e.datetime):typeof timezone==='string'?zonedInstant(e.datetime,timezone):undefined;
  // Without a timezone, expire only once the venue's calendar day is certainly past worldwide.
  const expiry=exact??(+validDate+36*60*60*1000);
  if(expiry<=+now)continue;
  const offers=Array.isArray(e.offers)?e.offers:[];
  const ticket=offers.find((o:any)=>o&&/ticket/i.test(String(o.type))&&o.status!=='sold out'&&safePublicUrl(o.url));
  shows.push({id:String(e.id??`${date}-${e.venue.name}`),title:typeof e.title==='string'&&e.title.trim()?e.title:'SRY4U live',datetime:e.datetime,date,venue:e.venue.name,city:typeof e.venue.city==='string'?e.venue.city:'',region:typeof e.venue.region==='string'?e.venue.region:'',country:typeof e.venue.country==='string'?e.venue.country:'',url:safePublicUrl(e.url),ticketUrl:safePublicUrl(ticket?.url),expiresAt:new Date(expiry).toISOString()});
 }
 if(raw.length&&recognized===0)throw new Error('Invalid event response');
 return [...new Map(shows.map(s=>[s.id,s])).values()].sort((a,b)=>a.datetime.localeCompare(b.datetime));
}
export async function fetchEvents({key,now=new Date(),fetcher=fetch}: {key?:string;now?:Date;fetcher?:typeof fetch}):Promise<EventFeed> {
 const unavailable:EventFeed={status:'unavailable',events:[],checkedAt:now.toISOString()};
 if(!key)return unavailable;
 try {
  const url=new URL('https://rest.bandsintown.com/artists/SRY4U/events');url.searchParams.set('app_id',key);url.searchParams.set('date','upcoming');
  const response=await fetcher(url,{signal:AbortSignal.timeout(6000),headers:{Accept:'application/json'}});
  if(!response.ok)return unavailable;
  return {status:'ok',events:normalizeEvents(await response.json(),now),checkedAt:now.toISOString()};
 }catch{return unavailable;}
}
