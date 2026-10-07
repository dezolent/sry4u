import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
 site:process.env.SITE_URL||'https://sry4u.com',
 // Accept both URL forms; keep generated pages in directories for static hosting.
 trailingSlash:'ignore',
 build:{format:'directory'},
 output:'static',
 devToolbar:{enabled:false},
 integrations:[sitemap({filter:(page)=>!page.includes('/404')&&!page.includes('/api/')&&!/\.(md|txt)\/?$/.test(page)})],
 vite:{build:{sourcemap:false}},
});
