import {test,expect} from '@playwright/test';
import {songs} from '../../src/data/songs';
import {albums} from '../../src/data/albums';

test('all page routes accept either trailing-slash form with one canonical URL',async({request})=>{
 const paths=['/music','/epk',...songs.map(song=>`/music/${song.id}`),...albums.map(album=>`/music/albums/${album.id}`)];
 for(const path of paths)for(const suffix of ['', '/']){
  const response=await request.get(path+suffix);expect(response.status(),path+suffix).toBe(200);
  const html=await response.text();expect(html,path+suffix).toContain(`rel="canonical" href="https://sry4u.com${path}/"`);
 }
});

test('slashless music and EPK keep the correct navigation state',async({page})=>{
 for(const [path,name] of [['/music','Music'],['/epk','EPK']]){
  await page.goto(path);const desktop=await page.locator('.desktop-nav').isVisible();
  if(!desktop)await page.locator('.mobile-menu summary').click();
  await expect(page.locator(desktop?'.desktop-nav':'.mobile-menu nav').getByRole('link',{name,exact:true})).toHaveAttribute('aria-current','page');
 }
});
