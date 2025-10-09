<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */

  import TextParagraph from '$components/TextParagraph/index.svelte';
  import type numeral from 'numeral';
  import Hashtag from '$components/BodyRenderer/Blocks/hashtag.svelte';
  import Icon from '$components/Icons/index.svelte';
  import { ArrowTopRightOnSquare } from '$components/Icons';
  import Link from '$components/BodyRenderer/Blocks/link.svelte';
  import Marquee from '$components/Marquee/index.svelte';

  export let isFeatured: boolean;
  export let slug: string;
  export let isExternal = false;
  export let communitySlug: string;
  export let messageSlug: string;
  export let title: string;
  export let subtitle: string;
  export let description: string;
  export let hashtags: string[];

  export let totalLoansOriginated: number;
  export let totalValueLocked: number;
  export let reservesInUsd: number;
  export let founders: string;
  export let investors: string;
  export let borrowers: string;
  export let ecosystemPartners: string;
  export let totalFunding: number;
  export let marketCapitalization: number;
  let className = '';
  export { className as class };

  function parseNumber(str: string | number): string {
    const num = Number(str);
    if (isNaN(num)) {
      throw new Error(`Cannot parse '${str}' into a number.`);
    }
    return '$' + num.toLocaleString();
  }

  let formattedTotalLoansOriginated: string | undefined;
  let formattedTotalValueLocked: string | undefined;
  let formattedReservesInUsd: string | undefined;
  let formattedTotalFunding: string | undefined;
  let formattedmarketCapitalization: string | undefined;

  $: {
    if (totalLoansOriginated !== undefined) {
      formattedTotalLoansOriginated = parseNumber(totalLoansOriginated);
    }
    if (totalValueLocked !== undefined) {
      formattedTotalValueLocked = parseNumber(totalValueLocked);
    }
    if (reservesInUsd !== undefined) {
      formattedReservesInUsd = parseNumber(reservesInUsd);
    }
    if (totalFunding !== undefined) {
      formattedTotalFunding = parseNumber(totalFunding);
    }
    if (marketCapitalization !== undefined) {
      formattedmarketCapitalization = parseNumber(marketCapitalization);
    }
  }

  const emptyTags = [
    'ethereum',
    'optimism',
    'polygon',
    'multi-chain',
    'architecture',
    'banking',
    'credit-rating',
    'zk',
    'software-development',
    'react',
    'hr',
    'remote',
    'team-management',
    'svelte',
    'ios',
    'android',
    'yield-farming',
    'nodejs',
    'factoring',
    'credit',
    'identity',
    'rwa',
    'asset-custody',
    'stablecoin',
    'flatcoin',
    'inflation',
    'betting',
    'etf',
    'trading',
    'nostr',
    'social-dapp',
    'options-trading',
    'voip',
    'streaming',
    'lending',
    'index',
    'wallet',
    'open-source',
    'typescript',
    'dapp',
    'go',
    'ai',
    'design',
    'oracle',
    'gaming',
    'defi',
    'exchange',
    'python',
    'poap',
    'nft',
    'decentraland',
    'did',
    'kyc',
    'collateralized',
    'layer-1',
    'cross-chain',
    'evm',
    'appchain',
    'layer-2',
    'telegram',
    'TON',
    'user-acquisition',
    'education',
    'productivity',
    'chrome-extension',
    'developers',
    'marketing',
    'KOLs',
    'influencers',
    'backtesting',
    'algorithmic',
    'fintech',
    'explorer',
    'privacy',
    'governance',
    'asset-management',
    'retail',
    'data',
];
  ];
</script>

<template lang="pug" src="./template.pug">
</template>
