export {};
const items=[...document.querySelectorAll<HTMLButtonElement>('[data-gallery-index]')];
const dialog=document.querySelector<HTMLDialogElement>('#gallery-dialog');const image=document.querySelector<HTMLImageElement>('#lightbox-image');const caption=document.querySelector('#lightbox-caption');
let index=0;let opener:HTMLButtonElement|undefined;let previousOverflow='';
function show(next:number){index=(next+items.length)%items.length;const item=items[index];if(image){image.src=item.dataset.full||'';image.alt=item.dataset.caption||'SRY4U artist photo';}if(caption)caption.textContent=`${index+1} / ${items.length} — ${item.dataset.caption}`;}
items.forEach((item,i)=>item.addEventListener('click',()=>{opener=item;show(i);previousOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';dialog?.showModal();}));
dialog?.querySelector('.lightbox-close')?.addEventListener('click',()=>dialog.close());
dialog?.querySelector('.lightbox-prev')?.addEventListener('click',()=>show(index-1));dialog?.querySelector('.lightbox-next')?.addEventListener('click',()=>show(index+1));
dialog?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(index-1);}if(e.key==='ArrowRight'){e.preventDefault();show(index+1);}});
dialog?.addEventListener('close',()=>{document.documentElement.style.overflow=previousOverflow;opener?.focus();});
