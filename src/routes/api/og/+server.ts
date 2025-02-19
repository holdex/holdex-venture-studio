import ogs from 'open-graph-scraper';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface OpenGraphResponse {
  success: number;
  meta: {
    title?: string;
    site_name?: string;
    description?: string;
    image?: string | null;
  };
  link: string;
}

export const GET: RequestHandler = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return json({ success: 0, meta: {}, link: '' }, { status: 400 });
  }

  try {
    const options = {
      url: targetUrl,
      followRedirect: true,
      maxRedirects: 5,
      timeout: 10000,
    };

    const { result } = await ogs(options);

    const response: OpenGraphResponse = {
      success: 1,
      meta: {
        title: result.ogTitle,
        site_name: result.ogSiteName,
        description: result.ogDescription,
        image: result.ogImage?.[0]?.url || null,
      },
      link: targetUrl,
    };

    return json(response);
  } catch (error) {
    return json({ success: 0, meta: {}, link: targetUrl });
  }
};