<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { routes } from '$lib/config';
  import Parser from '$components/BodyParser';
  import {
    feedEmptyIcon,
    HandThumbUp,
    ChatBubbleLeftEllipsis,
    Bolt,
    XMark,
    InformationCircle,
    BookOpen,
    UserGroup,
  } from '$components/Icons';
  import MetaTags from '$components/MetaTags/index.svelte';
  import Icon from '$components/Icons/index.svelte';

  // import DefaultFeedItem from '$components/Feed/Item/index.svelte';
  // import Feed from '$components/Feed/index.svelte';
  import PortfolioItem from '$components/Portfolio/index.svelte';
  import CompanyLogoStrip from '$components/CompanyLogoStrip/index.svelte';
  import Link from '$components/BodyRenderer/Blocks/link.svelte';

  import { timeFormat, extendedTimeFormat } from '$components/DateManager';
  import { formatNumber } from '$components/NumbersManager';

  import type { Message } from '$lib/types/api';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ store, options: queryOptions } = data);
  $: ({ data: storeData } = $store);
  $: ({ edges, totalCount, pageInfo } = storeData?.postedMessages || {
    edges: [],
    totalCount: 0,
    pageInfo: null,
  });
  $: pageFilter = undefined;
  $: isSearchMode = false;
  $: pageQ = undefined;
  $: handleSort = () => {};

  let parseMessage = (message: Message, category: string) => {
    return Parser.parseViaCategory(message, category);
  };

  let isRefetching = false;
  let loadMore = async (afterCursor?: string) => {
    isRefetching = true;
    await store.fetchMore({
      variables: {
        feedInput: {
          ...queryOptions.feedInput,
          pageInfo: {
            ...queryOptions.feedInput.pageInfo,
            afterCursor,
          },
        },
      },
    });
    isRefetching = false;
  };

</script>

<MetaTags
  title="Our Portfolio of Startups | Holdex"
  description="A list of blockchain products Holdex has worked across different verticals including DeFi, lending, KYC, gameFi, DAO, and developer tools, to name a few."
  path={routes.portfolio}
  imagePath="/og/portfolio.png"
/>

<template lang="pug" src="./template.pug">
</template>
