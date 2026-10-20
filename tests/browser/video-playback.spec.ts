import {test,expect} from '@playwright/test';

// External-service smoke check: opt in explicitly rather than making ordinary
// CI depend on YouTube's network, ad delivery, or regional availability.
test.skip(!process.env.YOUTUBE_PLAYBACK_SMOKE,'Set YOUTUBE_PLAYBACK_SMOKE=1 to test real YouTube playback.');

for(const id of ['atonement-fox-theatre','atonement-session-1-1','sry4u-chomp-take-la','sanzu-minnesota']){
 test(`YouTube plays ${id} within its watch page`,async({page})=>{
  await page.goto(`/videos/${id}/`);
  const frame=page.frameLocator('.video-player iframe');
  const play=frame.getByRole('button',{name:/^Play( video)?$/}).first();
  await expect(play).toBeVisible({timeout:5000});
  await play.click();
  await expect.poll(async()=>frame.locator('video').evaluateAll((elements,minimumTime)=>elements.some(element=>{
   const video=element as HTMLVideoElement;
   return video.currentTime>minimumTime&&!video.paused;
  }),id==='atonement-session-1-1'?10:2),{timeout:20000,message:'The embedded video should advance while playing'}).toBe(true);
  expect(new URL(page.url()).pathname).toBe(`/videos/${id}/`);
  if(id==='atonement-session-1-1')await page.screenshot({path:'/tmp/sry4u-session-playing.png'});
 });
}
