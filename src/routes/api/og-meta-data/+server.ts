import { json, type RequestHandler } from "@sveltejs/kit";
import ogs from 'open-graph-scraper';
import { parseOgResult } from "$lib/utils/parseOgResult";

export const GET: RequestHandler = async ({ fetch, url }) => {

    const site = decodeURIComponent(url.searchParams.get('site') || '');
    if (!site) {
        return json(parseOgResult({ requestUrl:null }),{status:400});
    }
    try {
        const data = await ogs({ url: site});
        const response = parseOgResult(data.result);
        return json(response);
    } catch (err) {
        console.error('Error:', err);
        return json(parseOgResult({ requestUrl:site }),{status:400});
    }
};
