import ogs from 'open-graph-scraper';
import { isDev } from "$lib/config";
import { isStage } from "$lib/server/config";
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { formatUrlToTitle } from '$lib/utils';

type OpenGraphResponse = {
  url: string;
  title: string;
  description: string;
  imageUrl: string | null;
};

const createDefaultResponse = (targetUrl: string | null): OpenGraphResponse => ({
  url: targetUrl || '',
  title: targetUrl ? formatUrlToTitle(targetUrl) : '',
  description: '',
  imageUrl: null,
});

const getCacheControl = () => {
  if (isDev) return 'no-cache';
  return isStage ? 'max-age=0, s-maxage=500' : 'max-age=0, s-maxage=3600';
};

const fetchOpenGraph = async (targetUrl: string): Promise<OpenGraphResponse> => {
  // Validate URL format and allowed domains
  const url = new URL(targetUrl);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Invalid URL protocol');
  }

  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
  const { result } = await ogs({
    url: targetUrl,
    timeout: 5000,
    fetchOptions: {
      headers: { 'user-agent': userAgent },
    },
  });

  return {
    url: targetUrl,
    title: result.ogTitle || formatUrlToTitle(targetUrl),
    description: result.ogDescription || '',
    imageUrl: result.ogImage?.[0]?.url || null,
  };
};

export const GET: RequestHandler = async ({ url, setHeaders }) => {
  const targetUrl = url.searchParams.get('url');
  const defaultResponse = createDefaultResponse(targetUrl);

  if (!targetUrl) {
    return json(defaultResponse, { status: 400 });
  }

  setHeaders({
    'Cache-Control': getCacheControl(),
  });

  try {
    const response = await fetchOpenGraph(targetUrl);
    return json(response);
  } catch (error: any) {
    console.error(`Error fetching OG data for ${targetUrl}:`, error);
    if (error instanceof TypeError) {
      return json(defaultResponse, { status: 400 });
    }
    if (error.code === 'ETIMEDOUT') {
      return json(defaultResponse, { status: 504 });
    }
    return json(defaultResponse);
  }
};