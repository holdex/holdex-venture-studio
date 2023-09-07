import { json, type RequestHandler } from '@sveltejs/kit';
import ogs from 'open-graph-scraper';

export const GET: RequestHandler = async ({ url }) => {
  const urlin = url.searchParams.get('url') || undefined;
  const options = { url: urlin };

  if (!urlin) return json({ message: 'Invalid URL', status: 400 });

  try {
    const data = await ogs(options);

    if (data) {
      const { error, result } = data;
      const { ogDescription, ogTitle, ogImage, ogSiteName } = result;
      if (result && !error) {
        return json(
          {
            desc: ogDescription,
            title: ogTitle,
            image: ogImage,
            name: ogSiteName,
          },
          {
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    console.log('Call to opengraph failed.', error!.result?.error);
    return json({ status: 400, error: error!.result?.error });
  }
};
