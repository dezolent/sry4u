import {test,expect} from '@playwright/test';

test('pages use Astro image assets without pre-generated public variants',async({page})=>{
 for(const route of ['/','/music/','/epk/','/music/chromvtik-f33ling/']){
  const response=await page.goto(route);expect(response?.status()).toBe(200);
  await expect(page.locator('img[src*="/optimized/"], img[srcset*="/optimized/"]')).toHaveCount(0);
  expect(await page.locator('img[data-image-component]').count()).toBeGreaterThan(0);
  await expect(page.locator('img[data-image-component]').first()).toHaveAttribute('src',/\/_image\?/);
 }
});
