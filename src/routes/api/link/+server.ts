import { default as clientConfig } from '$lib/config';
import config from '$lib/server/config';
import { json, type RequestHandler } from '@sveltejs/kit';
import ogs from 'open-graph-scraper';
export const GET: RequestHandler = async ({ fetch, url, params }) => {
  const urlin = url.searchParams.get('url');
  const options = { url: urlin };

  ogs(options).then((data) => {
    const { error, html, result, response } = data;
    console.log('error:', error); // This returns true or false. True if there was an error. The error itself is inside the result object.
    console.log('html:', html); // This contains the HTML of page
    console.log('result:', result); // This contains all of the Open Graph results
    console.log('response:', response); // This contains response from the Fetch API
  });
  //   const og =

  return json(
    {
      result: 'ok',
    },
    {
      status: 200,
    }
  );

  //   const ticker = url.searchParams.get('ticker');

  //   if (!ticker) {
  //     return json({ error: 'invalid_arguments' }, { status: 400 });
  //   }

  //   return fetch(`${clientConfig.utilsApiUrl}/exchange-rate?ticker=${ticker}`, {
  //     headers: {
  //       'x-holdex-authorization': `Bearer ${config.utilsApiKey}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((tickerInfo) => {
  //       if (!tickerInfo.error) {
  //         return json(
  //           {
  //             change: tickerInfo.data.changePercent24Hr || 0,
  //             price: tickerInfo.data.priceUsd || 0,
  //           },
  //           { status: 200 }
  //         );
  //       }

  //       return json({ error: tickerInfo.error }, { status: 400 });
  //     })
  //     .catch((err) => {
  //       return json({ error: err }, { status: 400 });
  //     });
};
