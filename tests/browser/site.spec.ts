import {test,expect} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
test('home has ten real fanlinks, all eight photos, and no horizontal overflow',async({page})=>{
 await page.goto('/');await expect(page.getByRole('heading',{level:1})).toContainText('SRY4U');
 await expect(page.locator('#featured .track-row')).toHaveCount(10);await expect(page.locator('[data-gallery-index]')).toHaveCount(8);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await expect(page.locator('#featured .track-row').first()).toHaveAttribute('target','_blank');
});
test('search, category and URL state reset without hiding catalog for no-JS visitors',async({page})=>{
 await page.goto('/music/?q=Yuna');await expect(page.locator('.release-card:visible')).toHaveCount(1);
 await page.getByLabel('Search releases').fill('nothingmatches');await expect(page.getByRole('heading',{name:'No signal found.'})).toBeVisible();
 await page.getByRole('button',{name:'Clear filters',exact:true}).click();await expect(page.locator('.release-card:visible')).toHaveCount(22);
 await page.getByLabel('Release type').selectOption('mix');await expect(page.locator('.release-card:visible')).toHaveCount(1);expect(page.url()).toContain('category=mix');
});
test('gallery supports next, Escape and restores focus',async({page})=>{
 await page.goto('/');const opener=page.locator('[data-gallery-index="0"]');await opener.click();await expect(page.locator('#gallery-dialog')).toBeVisible();
 await page.getByRole('button',{name:'Next photo'}).click();await expect(page.locator('#lightbox-caption')).toContainText('2 / 8');
 await page.keyboard.press('Escape');await expect(page.locator('#gallery-dialog')).not.toBeVisible();await expect(opener).toBeFocused();
});
test('fanlink exposes the supplied streaming service and downloadable EPK works',async({page,request})=>{
 await page.goto('/music/chromvtik-f33ling/');await expect(page.getByRole('heading',{level:1})).toContainText('CHROMVTIK F33LING');
 await expect(page.getByRole('link',{name:/Listen on Spotify/})).toHaveAttribute('href','https://open.spotify.com/track/6CY9JbAyJihDduAkBiFJBk');
 await page.goto('/epk/');await expect(page.getByRole('link',{name:/Download EPK/})).toHaveAttribute('download',/SRY4U/);
 expect((await request.get('/docs/SRY4U_EPK_2026_v5.pdf')).ok()).toBeTruthy();
});
test('hero can pause motion and key pages have no serious accessibility findings',async({page})=>{
 await page.goto('/');const pause=page.getByRole('button',{name:'Pause motion'});await pause.click();await expect(page.getByRole('button',{name:'Resume motion'})).toHaveAttribute('aria-pressed','true');
 for(const route of ['/','/music/','/epk/','/music/chromvtik-f33ling/']){
  await page.goto(route);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations,route).toEqual([]);
 }
});
test('live feed shows honest empty and unavailable states',async({page})=>{
 await page.route('**/api/events',route=>route.fulfill({contentType:'application/json',body:JSON.stringify({status:'ok',events:[],checkedAt:new Date().toISOString()})}));
 await page.goto('/');await expect(page.getByText('The next chapter is coming.')).toBeVisible();
 await page.unroute('**/api/events');await page.route('**/api/events',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({status:'unavailable',events:[],checkedAt:new Date().toISOString()})}));
 await page.reload();await expect(page.locator('[data-show-status]')).toContainText('temporarily unavailable');
});

test('analytics only loads after consent and queues valid gtag commands',async({page})=>{
 await page.route('https://www.googletagmanager.com/**',route=>route.fulfill({contentType:'text/javascript',body:''}));
 await page.route('**/music/',async route=>{const response=await route.fetch();const body=(await response.text()).replace(/data-analytics-id(?:="[^"]*")?/, 'data-analytics-id="G-TEST123"');await route.fulfill({response,body});});
 await page.goto('/music/');expect(await page.locator('script[src*="googletagmanager"]').count()).toBe(0);
 await page.locator('[data-privacy-open]').click();await page.locator('[data-analytics-choice="granted"]').click();
 await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(1);
 const commands=await page.evaluate(()=>((window as any).dataLayer||[]).map((entry:any)=>({kind:Object.prototype.toString.call(entry),command:entry[0]})));
 expect(commands).toEqual([{kind:'[object Arguments]',command:'js'},{kind:'[object Arguments]',command:'config'}]);
});

test('navigation and the full catalog remain usable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();
 await page.goto('http://127.0.0.1:4321/music/');await expect(page.locator('.release-card')).toHaveCount(22);
 await page.locator('.mobile-menu summary').click();await page.locator('.mobile-menu').getByRole('link',{name:'EPK',exact:true}).click();
 await expect(page.getByRole('link',{name:/Download EPK/})).toBeVisible();await context.close();
});
