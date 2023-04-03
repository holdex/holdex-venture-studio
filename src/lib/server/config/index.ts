import { VERCEL_ENV, SITEMAP_AUTHORIZATION_KEY, CONTACT_FORM_SUBMIT_URL } from '$env/static/private'
import { dev } from '$app/environment'

type Config = {
    sitemapAuthKey: string
    contactFormSubmitUrl: string
}

let config: Config = {
    sitemapAuthKey: SITEMAP_AUTHORIZATION_KEY,
    contactFormSubmitUrl: CONTACT_FORM_SUBMIT_URL
}

export let isDev = dev;
export let isStage = VERCEL_ENV === 'preview';

export default config;