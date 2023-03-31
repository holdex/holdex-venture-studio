import { VERCEL_ENV, SITEMAP_AUTHORIZATION_KEY } from '$env/static/private'
import { dev } from '$app/environment'

type Config = {
    sitemapAuthKey: string
}

let config: Config = {
    sitemapAuthKey: SITEMAP_AUTHORIZATION_KEY,
}

export let isDev = dev;
export let isStage = VERCEL_ENV === 'preview';

export default config;