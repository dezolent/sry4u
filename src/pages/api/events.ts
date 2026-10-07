import 'dotenv/config';import {createEventHandler} from '../../lib/event-handler';
// Build a safe public snapshot; Netlify's forced redirect serves the live function in production.
// During Astro dev, this handler is executed on every local request.
export const prerender=true;
export const GET=createEventHandler();
