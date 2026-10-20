import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths=['atonement-fox-theatre','atonement-session-1-1','sry4u-chomp-take-la','sanzu-minnesota'];

test('video collection links four thumbnails to dedicated watch pages',async({page})=>{
 await page.goto('/videos/');
 await expect(page.getByRole('heading',{level:1})).toContainText('VIDEOS');
 await expect(page.locator('.video-card')).toHaveCount(4);
 for(const path of paths){
  const card=page.locator(`.video-card:has(a[href="/videos/${path}/"])`);
  await expect(card.getByRole('img')).toBeVisible();
  await expect(card.locator('p')).not.toBeEmpty();
 }
 const graph=await page.locator('script[type="application/ld+json"]').evaluate(el=>JSON.parse(el.textContent!)['@graph']);
 const collection=graph.find((node:any)=>node['@type']==='CollectionPage');
 expect(collection['@id']).toBe('https://sry4u.com/videos/#page');
 expect(collection.mainEntity.itemListElement.map((entry:any)=>entry.url)).toEqual(paths.map(path=>`https://sry4u.com/videos/${path}/`));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});

test('watch pages expose the video as their main entity, matching player and metadata',async({page,request})=>{
 for(const path of paths){
  expect((await request.get(`/videos/${path}`)).status()).toBe(200);
  await page.goto(`/videos/${path}/`);
  const player=page.locator('iframe');
  await expect(player).toBeVisible();
  const graph=await page.locator('script[type="application/ld+json"]').evaluate(el=>JSON.parse(el.textContent!)['@graph']);
  const video=graph.find((node:any)=>node['@type']==='VideoObject');
  const watchPage=graph.find((node:any)=>node['@id']===`https://sry4u.com/videos/${path}/#page`);
  expect(watchPage.mainEntity['@id']).toBe(video['@id']);
  expect(video.embedUrl).toBe(await player.getAttribute('src'));
  expect(video.name).toBe(await page.getByRole('heading',{level:1}).textContent());
  expect(video.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}T.*[+-]\d{2}:\d{2}$/);
  expect(video.duration).toMatch(/^PT\d+M\d+S$/);
  expect((await request.get(new URL(video.thumbnailUrl).pathname)).ok()).toBeTruthy();
  expect(video.contentUrl).toBeUndefined(); // A YouTube watch URL is not a media file URL.
  await expect(page.getByRole('link',{name:'← ALL VIDEOS'})).toHaveAttribute('href','/videos/');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 }
});

test('set list and collapsed spoken transcripts are readable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});
 const page=await context.newPage();
 await page.goto('http://localhost:4321/videos/atonement-session-1-1/');
 await expect(page.locator('.setlist li').first()).toContainText('SRY4U Massive Intro Edit');
 await expect(page.locator('.setlist li').last()).toContainText('Zeds Dead - Lost You');
 for(const path of ['sry4u-chomp-take-la','sanzu-minnesota']){
  await page.goto(`http://localhost:4321/videos/${path}/`);
  const details=page.locator('details.transcript');
  await expect(details).not.toHaveAttribute('open');
  await expect(details.locator('.transcript-segments')).not.toBeVisible();
  await details.locator('summary').click();
  await expect(details.locator('.transcript-segments')).toBeVisible();
  await expect(details.locator('.transcript-segments li').first()).toBeVisible();
 }
 await context.close();
});

test('video collection and watch page meet accessibility checks',async({page})=>{
 for(const path of ['/videos/','/videos/sry4u-chomp-take-la/']){
  await page.goto(path);
  const result=await new AxeBuilder({page}).exclude('iframe').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
 }
});
