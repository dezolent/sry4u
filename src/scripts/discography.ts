import {filterReleases} from '../lib/catalog';import type {FilterableRelease} from '../lib/catalog';
const form=document.querySelector<HTMLFormElement>('#release-filters');const cards=[...document.querySelectorAll<HTMLElement>('#song-releases .release-card[data-release]')];const count=document.querySelector('#release-count');const empty=document.querySelector<HTMLElement>('#empty-results');
const records:FilterableRelease[]=cards.map(card=>JSON.parse(card.dataset.release||'{}'));
if(form){
 const search=new URLSearchParams(location.search);
 for(const key of ['q','genre','year','category']){const input=form.elements.namedItem(key) as HTMLInputElement|HTMLSelectElement;if(input&&search.has(key))input.value=search.get(key)||'';}
 function apply(update=true){
  const values=Object.fromEntries(new FormData(form!).entries()) as Record<string,string>;const matches=new Set(filterReleases(records,values).map(r=>r.id));
  cards.forEach(card=>{card.hidden=!matches.has(card.dataset.id||'');});if(count)count.textContent=`${matches.size} ${matches.size===1?'song':'songs'}`;if(empty)empty.hidden=matches.size!==0;
  if(update){const url=new URL(location.href);for(const key of ['q','genre','year','category']){if(values[key])url.searchParams.set(key,values[key]);else url.searchParams.delete(key);}history.replaceState(null,'',url);}
 }
 form.addEventListener('input',()=>apply());form.addEventListener('change',()=>apply());form.addEventListener('submit',e=>{e.preventDefault();apply();});
 document.querySelectorAll('[data-clear-filters]').forEach(b=>b.addEventListener('click',()=>{form.reset();apply();(form.elements.namedItem('q') as HTMLInputElement).focus();}));apply(false);
}
