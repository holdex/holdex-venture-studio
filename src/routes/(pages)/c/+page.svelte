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

  import DefaultFeedItem from '$components/Feed/Item/index.svelte';
  import Feed from '$components/Feed/index.svelte';

  import { timeFormat, extendedTimeFormat } from '$components/DateManager';
  import { formatNumber } from '$components/NumbersManager';
  import { parseQueryFilter } from './util';

  import type { Message } from '$lib/types/api';
  import type { PageData } from './$types';

  export let data: PageData;

  const escapeHtml = (unsafe: string): string =>
    unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  $: ({ store, options: queryOptions } = data);
  $: ({ data: storeData } = $store);
  $: ({ edges, totalCount, pageInfo } = storeData?.postedMessages || {
    edges: [],
    totalCount: 0,
    pageInfo: null,
  });
  $: pageFilter = escapeHtml(getPageFilter($page.url) || '');
  $: pageQ = escapeHtml(getPageQ($page.url) || '');
  $: isSearchMode = checkSearchMode($page.url);

  $: metaTitle =
    pageFilter.length > 0
      ? `Search "${pageFilter}"`
      : pageQ.length > 0
      ? `Search Results for "${pageQ}"`
      : 'Holdex | Web3 based startup studio';

  $: metaDescription =
    pageFilter.length > 0 || pageQ.length > 0
      ? `A list of "${pageFilter || pageQ}" articles.`
      : 'We empower the next web3 innovators to build and accelerate blockchain adoption.';

  metaTitle = metaTitle || 'At Holdex, we’re helping innovators build the next web3 products';
  metaDescription =
    metaDescription || 'Discover blockchain resources, opportunities, and insights with Holdex.';

  let parseMessage = (message: Message, category: string) => {
    return Parser.parseViaCategory(message, category);
  };

  let getPageFilter = (url: URL) => {
    const filter = url.searchParams.get('filter');
    return filter;
  };

  let getPageQ = (url: URL) => {
    const q = url.searchParams.get('q');
    return q;
  };

  let checkSearchMode = (url: URL) => {
    const q = url.searchParams.get('q');
    const filter = url.searchParams.get('filter');

    return q || (filter && !['CREATED_AT', 'NET_UP_VOTES'].includes(filter));
  };

  let handleSort = (url: URL, filter: string) => {
    const newUrl = url;

    newUrl.searchParams.delete('q');
    newUrl.searchParams.set('filter', filter);
    return goto(newUrl, { invalidateAll: true });
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
  title={metaTitle}
  description={metaDescription}
  path={$page.url.pathname}
  imagePath="/og/index.png"
/>

<template lang="pug" src="./template.pug"></template>
