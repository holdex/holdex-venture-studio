import { default as clientConfig } from '$lib/config';
import config from '$lib/server/config';
import { json, type RequestHandler } from '@sveltejs/kit';

type Coin = {
  id: string;
  symbol: string;
  name: string;
};

let coins: Coin[] = [];

/**
 * Gets coin basic info from the Coingecko API or from the in-memory cache
 * Currently uses public API with rate limit of 20-30 requests per minute. This might be a problem if the same server uses Coingecko API for other purposes
 * @param symbol ticker symbol of a coin in lowercase
 * @returns coin basic info or undefined if not able to find or fetch
 */
async function getCoin(symbol: string): Promise<Coin | undefined> {
  let coin = coins.find((coin) => coin.symbol === symbol);

  if (!coin) {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=false');
    if (res.ok) {
      coins = await res.json();
      coin = coins.find((coin) => coin.symbol === symbol);
    }
  }

  return coin;
}

export const GET: RequestHandler = async ({ fetch, url }) => {
  const symbol = url.searchParams.get('symbol');

  if (!symbol) {
    return json({ error: 'invalid_arguments' }, { status: 400 });
  }

  const coin = await getCoin(symbol);

  if (!coin) {
    return json({ error: `$${symbol.toUpperCase()} is not yet listed` }, { status: 404 });
  }

  const res = await fetch(
    `${clientConfig.utilsApiUrl}/market-data/coins?url=https://www.coingecko.com/en/coins/${coin.id}&source=info`,
    {
      headers: {
        'x-holdex-authorization': `Bearer ${config.utilsApiKey}`,
      },
    }
  );

  if (!res.ok) {
    return json({ error: `Failed to load data for $${symbol.toUpperCase()}` }, { status: 500 });
  }

  const cointData = await res.json();

  return json(
    {
      ...coin,
      change: cointData.data.market_data?.price_change_24h || 0,
      price: cointData.data.market_data?.current_price?.usd || 0,
    },
    { status: 200 }
  );
};
