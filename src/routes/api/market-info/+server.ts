import { default as clientConfig } from "$lib/config";
import config from "$lib/server/config";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, url }) => {
    const marketUrl = url.searchParams.get('url');
    const source = url.searchParams.get('source');

    if (!marketUrl || !source) {
        return json({ error: "invalid_arguments" }, { status: 400 });
    }
    return fetch(`${clientConfig.utilsApiUrl}/market-data/coins?url=${marketUrl}&source=${source}`, {
        headers: {
            'x-holdex-authorization': `Bearer ${config.utilsApiKey}`
        }
    })
        .then(res => res.json())
        .then(({ data, error }) => {
            if (!error) {
                return json({ data }, { status: 200 });
            }
            return json({ error }, { status: 400 })
        })
        .catch(err => {
            return json({ error: err }, { status: 400 })
        })
}