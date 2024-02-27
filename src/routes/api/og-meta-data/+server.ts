import { json, type RequestHandler } from "@sveltejs/kit";
import ogs from 'open-graph-scraper';
import { parseOgResult } from "$lib/utils/parseOgResult";
import { isDev } from "$lib/config";
import { isStage } from "$lib/server/config";

export const GET: RequestHandler = async ({ url,setHeaders }) => {

    const site = decodeURIComponent(url.searchParams.get('site') || '');
    if (!site) {
        return json(parseOgResult({ requestUrl:null }),{status:400});
    }

    setHeaders({ 
        'Cache-Control': isDev
            ? 'no-cache'
            : isStage
            ? 'max-age=0, s-maxage=500'
            : 'max-age=0, s-maxage=3600',
    });
 
    try {
        const data = await ogs({ url: site});
        const response = parseOgResult(data.result);
        return json(response);
    } catch (err) {
        console.error('Error:', err);
        return json(parseOgResult({ requestUrl:site }),{status:400});
    }
};
