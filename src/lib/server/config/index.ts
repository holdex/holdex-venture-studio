import { VERCEL_ENV, SITEMAP_AUTHORIZATION_KEY, CONTACT_FORM_SUBMIT_URL } from '$env/static/private'
import { dev } from '$app/environment'

type Config = {
    sitemapAuthKey: string
    contactFormSubmitUrl: string,
    rollbarAccessToken: string,
}

let config: Config = {
    sitemapAuthKey: SITEMAP_AUTHORIZATION_KEY,
    contactFormSubmitUrl: CONTACT_FORM_SUBMIT_URL,
    rollbarAccessToken: "620a039a017846b9a02cc1705c740459"
}

export let isDev = dev;
export let isStage = VERCEL_ENV === 'preview';

export default config;