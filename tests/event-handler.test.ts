import test from 'node:test';import assert from 'node:assert/strict';import {createEventHandler} from '../src/lib/event-handler.ts';
const event={id:'1',datetime:'2026-10-07T04:00:00Z',url:'https://www.bandsintown.com/e/1?app_id=private',venue:{name:'Venue',city:'Denver',region:'CO',country:'US'},offers:[]};
test('cached response removes events that expire between refreshes',async()=>{
 let now=new Date('2026-10-07T03:59:00Z');let calls=0;
 const handler=createEventHandler({key:()=> 'private',now:()=>now,fetcher:async()=>{calls++;return new Response(JSON.stringify([event]));}});
 let response=await handler();assert.equal(response.status,200);assert.equal((await response.json()).events.length,1);
 now=new Date('2026-10-07T04:01:00Z');response=await handler();assert.equal((await response.json()).events.length,0);assert.equal(calls,1);
 now=new Date('2026-10-07T04:05:00Z');await handler();assert.equal(calls,2);
});
test('failed upstream response uses no-store and never emits credentials',async()=>{
 const handler=createEventHandler({key:()=> 'private',fetcher:async()=>new Response('denied private',{status:401})});const response=await handler();assert.equal(response.status,503);assert.equal(response.headers.get('Cache-Control'),'no-store');assert.ok(!(await response.text()).includes('private'));
});
