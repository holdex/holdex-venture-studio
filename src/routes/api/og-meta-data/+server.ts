import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ fetch, url }) => {
  try {
    const apiKey = '';
    const site = url.searchParams.get('site');
    const apiUrl = `https://jsonlink.io/api/extract?url=${site}&api_key=${apiKey}`;

    if (!site) {
      return json({ error: "search url not available", status: 400 });
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    return json(data);
  } catch (err) {
    return json({ error: 'Failed to fetch OG metadata' }, { status: 400 });
  }
};
