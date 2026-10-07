import type {ImageMetadata} from 'astro';

// Import the public originals so Astro can process them; plain public URLs bypass optimization.
const sources=import.meta.glob<ImageMetadata>([
 '../../public/images/brand/logos/white.png',
 '../../public/images/brand/logos/Sry4u LOGO (WITH EFFECT).png',
 '../../public/images/brand/profile/sry4u-profile-front-shot.jpg',
 '../../public/images/brand/profile/sry4u-profile-main-cutout.png',
 '../../public/images/brand/emblem/Sry4u EMBLEM 3 (COLOR).png',
 '../../public/images/brand/press-photos/*.jpg',
 '../../public/images/gallery/*.{png,jpg}',
 '../../public/images/branding-inspo/*.{png,jpg}',
 '../../public/images/covers/*.{png,jpg,jpeg,webp,avif}',
 '../../public/images/platforms/*.webp',
 '../../public/images/social/*.webp',
],{eager:true,import:'default'});

export function imageSource(publicPath:string):ImageMetadata {
 const source=sources[`../../public${publicPath}`];
 if(!source)throw new Error(`Missing source image: ${publicPath}`);
 return source;
}
