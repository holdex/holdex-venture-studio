import { PUB_API_URL, PUB_VERCEL_ENV } from '$env/static/public'
import { dev, browser } from '$app/environment'

type Config = {
    env: string
    apiUrl: string
}

let config: Config = {
    env: PUB_VERCEL_ENV,
    apiUrl: PUB_API_URL
}

export let isDev = dev;
export let isBrowser = browser;
export default config;