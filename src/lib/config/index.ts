import { PUB_API_URL } from '$env/static/public'
import { dev, browser } from '$app/environment'

type Config = {
    env: string
    apiUrl: string
}

let config: Config = {
    env: "development",
    apiUrl: PUB_API_URL
}

export let isDev = dev;
export let isBrowser = browser;
export default config;