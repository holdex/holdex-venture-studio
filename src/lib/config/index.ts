import { PUB_API_URL, PUB_VERCEL_ENV, PUB_APP_URL, PUB_ROLLBAR_ACCESS_TOKEN } from '$env/static/public'
import { dev, browser } from '$app/environment'

type Config = {
    env: string
    apiUrl: string
    appUrl: string,
    rollbarAccessToken: string,
}

let baseConfig: Config = {
    env: PUB_VERCEL_ENV,
    apiUrl: PUB_API_URL,
    appUrl: PUB_APP_URL,
    rollbarAccessToken: PUB_ROLLBAR_ACCESS_TOKEN,
}

let mockConfig: Config = {
    ...baseConfig,
    env: "development",
    apiUrl: "https://stellate.holdex.io",
};

const previewMock: boolean = false;
let config = previewMock ? mockConfig : baseConfig;


export const routes = {
    index: '/',
    about: '/about',
    studio: '/c',
    jobs: '/c/jobs',
    category: (category: string | undefined) => `/c/${category}`,
    message: (category: string | undefined, message: string | undefined) => `/c/${category}/${message}`
}

export let isDev = dev;
export let isBrowser = browser;
export default config;