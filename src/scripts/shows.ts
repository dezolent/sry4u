import type {EventFeed,Show} from '../lib/events';import {safePublicUrl} from '../lib/events';import {eventSchema} from '../lib/structured';
const list=document.querySelector('[data-show-list]');const state=document.querySelector<HTMLElement>('[data-show-state]');const message=document.querySelector('[data-show-message]');const help=document.querySelector('[data-show-help]');const status=document.querySelector('[data-show-status]');const retry=document.querySelector<HTMLButtonElement>('[data-show-retry]');const schema=document.querySelector('#event-schema');
const origin=document.querySelector<HTMLElement>('#tour')?.dataset.siteOrigin||new URL(document.querySelector<HTMLLinkElement>('link[rel=canonical]')?.href||location.href).origin;
let current:Show[]=[];
try{current=JSON.parse(document.querySelector('#events-data')?.textContent||'[]');}catch{}
function setText(selector:Element|null,text:string){if(selector)selector.textContent=text;}
function render(events:Show[],unavailable=false){
 current=events.filter(e=>Date.parse(e.expiresAt)>Date.now());list?.replaceChildren();
 for(const e of current){
  const row=document.createElement('article');row.className='show-row';row.dataset.expires=e.expiresAt;
  const time=document.createElement('time');time.dateTime=e.date;
  for(const [tag,text]of [['span',new Date(e.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',timeZone:'UTC'}).toUpperCase()],['strong',e.date.slice(8,10)],['small',e.date.slice(0,4)]]){const el=document.createElement(tag);el.textContent=text;time.append(el);}
  const location=document.createElement('div');location.className='show-location';const title=document.createElement('h3');title.textContent=[e.city,e.region].filter(Boolean).join(', ');const venue=document.createElement('p');venue.textContent=e.venue;location.append(title,venue);row.append(time,location);
  const url=safePublicUrl(e.ticketUrl)||safePublicUrl(e.url);
  if(url){const link=document.createElement('a');link.className='button';link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.dataset.track='ticket_open';link.textContent=safePublicUrl(e.ticketUrl)?'Get tickets ↗':'Event details ↗';row.append(link);}else{const p=document.createElement('p');p.textContent='Ticket details coming soon';row.append(p);}
  list?.append(row);
 }
 if(state)state.hidden=current.length>0;
 setText(message,unavailable?'Show listings are temporarily unavailable.':'The next chapter is coming.');
 setText(help,unavailable?'Check Bandsintown for the latest dates, or try again.':'No upcoming shows are listed right now. Follow SRY4U to hear when new dates drop.');
 if(retry)retry.hidden=!unavailable;
 if(schema)schema.textContent=JSON.stringify({'@context':'https://schema.org','@graph':current.map(e=>eventSchema(e,origin))});
}
let inFlight=false;let lastUnavailable=false;
async function refresh(){
 if(inFlight)return;inFlight=true;setText(status,'Checking the latest dates…');
 try{
  const response=await fetch('/api/events',{signal:AbortSignal.timeout(8000)});const feed=await response.json() as EventFeed;
  if(!response.ok||feed.status!=='ok'||!Array.isArray(feed.events))throw new Error('Unavailable');
  lastUnavailable=false;render(feed.events);setText(status,'Dates via Bandsintown · Updated just now');
 }catch{lastUnavailable=true;render(current,true);setText(status,current.length?'Live updates temporarily unavailable. Showing the last verified dates.':'Live show updates are temporarily unavailable. Check Bandsintown or try again.');}
 finally{inFlight=false;}
}
render(current,document.querySelector('#tour')?.getAttribute('data-feed-status')==='unavailable');void refresh();retry?.addEventListener('click',()=>void refresh());
document.addEventListener('visibilitychange',()=>{if(!document.hidden)void refresh();});
setInterval(()=>{render(current,lastUnavailable);if(!document.hidden)void refresh();},60000);
