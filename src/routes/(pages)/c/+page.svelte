<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { routes } from '$lib/config';
  import Parser from '$components/BodyParser';
  import clickOutside from '$routes/(pages)/c/clickoutside';
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
  import TextParagraph from '$components/TextParagraph/index.svelte';

  import DefaultFeedItem from '$components/Feed/Item/index.svelte';
  import Feed from '$components/Feed/index.svelte';

  import { timeFormat, extendedTimeFormat } from '$components/DateManager';
  import { formatNumber } from '$components/NumbersManager';
  import { parseQueryFilter } from './util';

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
  $: pageFilter = getPageFilter($page.url);
  $: pageQ = getPageQ($page.url);
  $: isSearchMode = checkSearchMode($page.url);

  export let avatar_list = [ "female-avatar.png", "avatar-2.png", "avatar-3.png", "avatar-4.png"]

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

  // bool for toggling modal 
  export let isOpen = false;

  // bool for managing subscription 
  export let isSubscribed = false

  // toogle func for manage modal
  /** @param {boolean} subscribeState */
  let toggle = (subscribeState: boolean) => {
    isOpen = !isOpen
    isSubscribed = subscribeState
  }

  // hook for manage outside click
  /** @param {MouseEvent} event */
  let handleClickOutside = (event: MouseEvent) => {
    isOpen = !isOpen
	}

  // fun for managing user subscription
  /** @param {MouseEvent} event */
  let subscribe = (event: MouseEvent) => {
    isSubscribed = !isSubscribed
	}

</script>

<MetaTags
  title="Holdex | Web3 based startup studio"
  description="We empower the next web3 innovators to build and accelerate blockchain adoption."
  path={routes.studio}
  imagePath="/og/index.png"
/>

<template lang="pug" src="./template.pug">
</template>
