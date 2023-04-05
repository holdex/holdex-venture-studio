import { PUB_API_URL, PUB_VERCEL_ENV } from '$env/static/public'
import { dev, browser } from '$app/environment'

type Config = {
    env: string
    apiUrl: string
    appUrl: string
}

let baseConfig: Config = {
    env: PUB_VERCEL_ENV,
    apiUrl: PUB_API_URL,
    appUrl: "https://holdex.io"
}

let mockConfig: Config = {
    env: "development",
    apiUrl: "https://stellate.holdex.io",
    appUrl: "https://holdex.io"
};

const previewMock: boolean = false;
let config = previewMock ? mockConfig : baseConfig;


export const routes = {
    index: '/',
    about: '/about',
    studio: '/c',
    category: (category: string | undefined) => `/c/${category}`,
    message: (category: string | undefined, message: string | undefined) => `/c/${category}/${message}`
}

export let isDev = dev;
export let isBrowser = browser;
export default config;