import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEvents, fetchEvents, safePublicUrl } from '../src/lib/events.ts';
const now = new Date('2026-10-06T18:00:00Z');
const event = { id: '42', datetime: '2026-11-07T19:00:00', title: 'SRY4U', url: 'https://www.bandsintown.com/e/42?app_id=SECRET&came_from=267', venue: {name: 'Westport Bowery', city: 'Kansas City', region: 'MO', country: 'United States'}, offers: [{type:'Tickets', url:'https://tickets.example/show?app_id=SECRET', status:'available'}] };
test('future event retains source venue-local time and safe ticket URL', () => {
 const [result] = normalizeEvents([event], now);
 assert.equal(result.date,'2026-11-07'); assert.equal(result.city,'Kansas City'); assert.equal(result.region,'MO');
 assert.equal(result.ticketUrl,'https://tickets.example/show'); assert.equal(result.datetime,'2026-11-07T19:00:00');
 assert.equal(result.url,'https://www.bandsintown.com/e/42?came_from=267');
});
test('past and cancelled events disappear', () => {
 assert.equal(normalizeEvents([{...event,datetime:'2026-10-01T19:00:00'}, {...event,cancelled:true}],now).length,0);
});
test('an explicitly zoned event disappears after its start', () => {
 assert.equal(normalizeEvents([{...event,datetime:'2026-10-06T12:00:00-04:00'}],now).length,0);
});
test('unknown timezone does not remove a show while its venue day may still be current', () => {
 assert.equal(normalizeEvents([{...event,datetime:'2026-10-06T19:00:00'}],now).length,1);
});
test('known venue timezone distinguishes a past local show from a future one', () => {
 assert.equal(normalizeEvents([{...event,datetime:'2026-10-06T12:00:00',timezone:'America/New_York'}],now).length,0);
 assert.equal(normalizeEvents([{...event,datetime:'2026-10-06T19:00:00',timezone:'America/New_York'}],now).length,1);
});
test('missing ticket offer uses event details without inventing a ticket', () => {
 const [result]=normalizeEvents([{...event,offers:[]}],now);assert.equal(result.ticketUrl,undefined);assert.ok(result.url);
});
test('unsafe protocols are removed and sensitive URL keys are redacted',()=>{
 assert.equal(safePublicUrl('javascript:alert(1)'),undefined);
 assert.equal(safePublicUrl('https://example.com/?APP_ID=secret&api_key=secret&x=1'),'https://example.com/?x=1');
 const [result]=normalizeEvents([{...event,offers:[{type:'Tickets',status:'available',url:'javascript:alert(1)'}]}],now);assert.equal(result.ticketUrl,undefined);
});
test('duplicates are deduplicated and invalid calendar dates are rejected',()=>{
 assert.equal(normalizeEvents([event,event],now).length,1);
 assert.throws(()=>normalizeEvents([{...event,datetime:'2026-02-30T19:00:00'}],now));
});
test('malformed upstream data cannot masquerade as an empty schedule',()=>{
 assert.throws(()=>normalizeEvents({error:'denied'},now));assert.throws(()=>normalizeEvents([{foo:'bar'}],now));
 assert.deepEqual(normalizeEvents([],now),[]);
});
test('successful empty response is distinct from upstream failure',async()=>{
 const empty=await fetchEvents({key:'secret',now,fetcher:async()=>new Response('[]')});assert.equal(empty.status,'ok');assert.deepEqual(empty.events,[]);
 const error=await fetchEvents({key:'secret',now,fetcher:async()=>new Response('{}',{status:403})});assert.equal(error.status,'unavailable');assert.deepEqual(error.events,[]);
});
test('missing key, rejected request and malformed JSON return sanitized unavailable state',async()=>{
 for(const opts of [{key:undefined},{key:'secret',fetcher:async()=>{throw new Error('secret');}},{key:'secret',fetcher:async()=>new Response('not json')}]){
  const feed=await fetchEvents({...opts,now});assert.equal(feed.status,'unavailable');assert.ok(!JSON.stringify(feed).includes('secret'));
 }
});
test('fetch uses the fixed artist endpoint and abort signal',async()=>{
 const feed=await fetchEvents({key:'secret',now,fetcher:async(url,options)=>{
  assert.equal(new URL(String(url)).origin,'https://rest.bandsintown.com');assert.equal(new URL(String(url)).searchParams.get('date'),'upcoming');assert.ok(options?.signal);return new Response(JSON.stringify([event]));
 }});assert.equal(feed.events.length,1);
});
