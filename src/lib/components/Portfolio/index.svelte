<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */

  import TextParagraph from '$components/TextParagraph/index.svelte';
  import type numeral from 'numeral';
  import Hashtag from '$components/BodyRenderer/Blocks/hashtag.svelte';
  import Icon from '$components/Icons/index.svelte';
  import { ArrowTopRightOnSquare } from '$components/Icons';

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
  let borrowersAnimationDuration: number | undefined;
  let investorsAnimationDuration: number | undefined;

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
    if (borrowers !== undefined) {
      borrowersAnimationDuration = JSON.parse(borrowers).length * 2;
    }
    if (investors !== undefined) {
      investorsAnimationDuration = JSON.parse(investors).length * 2;
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
    ' nodejs',
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
    'nodejs',
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
  ];
</script>

<template lang="pug" src="./template.pug">
</template>
