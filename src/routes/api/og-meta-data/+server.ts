import { json, type RequestHandler } from "@sveltejs/kit";
import ogs from 'open-graph-scraper';
import { parseOgResult } from "$lib/utils/parseOgResult";
import { isDev } from "$lib/config";
import { isStage } from "$lib/server/config";

export const GET: RequestHandler = async ({ url, setHeaders }) => {
    const site = decodeURIComponent(url.searchParams.get('site') || '');
    if (!site) {
        return json(parseOgResult({ requestUrl: null }), { status: 400 });
    }

    setHeaders({
        'Cache-Control': isDev
            ? 'no-cache'
            : isStage
            ? 'max-age=0, s-maxage=500'
            : 'max-age=0, s-maxage=3600',
    });

    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
    const options = {
        url: site,
        fetchOptions: { headers: { 'user-agent': userAgent } }
    };

    try {
        const data = await ogs(options);
        return json(parseOgResult(data.result));
    } catch (err) {
        console.error('Error:', err);
        const rootDomain = getRootDomain(site);
        const rootOptions = {
            url: `https://${rootDomain}`,
            fetchOptions: { headers: { 'user-agent': userAgent } }
        };

        try {
            const rootData = await ogs(rootOptions);
            return json(parseOgResult({ogTitle:rootData.result.ogTitle,success:rootData.result.success}));
        } catch (rootErr) {
            console.error('Error fetching root domain OG data:', rootErr);
            return json(parseOgResult({ requestUrl: rootDomain }), { status: 400 });
        }

    }
};

function getRootDomain(url:string) {
    try {
        const newUrl = new URL(url);
        return newUrl.hostname;
    } catch (e:any) {
        console.error('Invalid URL:', e);
        return null;
    }
}
