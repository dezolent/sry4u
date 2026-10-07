export {};
const motion=document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
motion?.addEventListener('click',()=>{const paused=document.body.classList.toggle('motion-paused');motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'Resume motion':'Pause motion';});
const menu=document.querySelector<HTMLDetailsElement>('.mobile-menu');
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.open=false;}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.open){menu.open=false;menu.querySelector('summary')?.focus();}});
const dialog=document.querySelector<HTMLDialogElement>('#privacy-dialog');
const analyticsId=document.body.dataset.analyticsId||'';
const analyticsWindow=window as unknown as Record<string,any>;
let consent='denied';let loaded=false;
try{consent=localStorage.getItem('sry4u-analytics')||'denied';}catch{}
function enableAnalytics(){
 if(!/^G-[A-Z0-9]+$/.test(analyticsId)||consent!=='granted')return;
 analyticsWindow[`ga-disable-${analyticsId}`]=false;
 if(loaded)return;loaded=true;analyticsWindow.dataLayer=analyticsWindow.dataLayer||[];
 analyticsWindow.gtag=function(){analyticsWindow.dataLayer.push(arguments);};
 analyticsWindow.gtag('js',new Date());analyticsWindow.gtag('config',analyticsId,{anonymize_ip:true});
 const script=document.createElement('script');script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;document.head.append(script);
}
enableAnalytics();
document.querySelectorAll('[data-privacy-open]').forEach(button=>button.addEventListener('click',()=>dialog?.showModal()));
document.querySelector('[data-privacy-close]')?.addEventListener('click',()=>dialog?.close());
document.querySelectorAll<HTMLButtonElement>('[data-analytics-choice]').forEach(button=>button.addEventListener('click',()=>{
 consent=button.dataset.analyticsChoice||'denied';try{localStorage.setItem('sry4u-analytics',consent);}catch{}
 analyticsWindow[`ga-disable-${analyticsId}`]=consent!=='granted';if(consent==='granted')enableAnalytics();dialog?.close();
}));
document.addEventListener('click',event=>{const link=(event.target as Element).closest<HTMLAnchorElement>('a[data-track]');if(link&&consent==='granted'&&loaded)analyticsWindow.gtag('event',link.dataset.track,{link_url:link.href.split('?')[0]});});
