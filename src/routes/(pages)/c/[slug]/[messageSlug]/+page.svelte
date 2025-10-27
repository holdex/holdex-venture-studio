<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import Parser from '$components/BodyParser';
  import BodyRenderer from '$components/BodyRenderer/index.svelte';
  import Icon from '$components/Icons/index.svelte';
  import MetaTags from '$components/MetaTags/index.svelte';
  import PageTitle from '$components/PageTitle/index.svelte';
  import TextParagraph from '$components/TextParagraph/index.svelte';
  import Button from '$components/Button/index.svelte';
  import ArticleHeaderImage from '$components/ArticleHeaderImage/index.svelte';

  import { timeFormat, extendedTimeFormat } from '$components/DateManager';
  import { formatNumber } from '$components/NumbersManager';
  import { BarsArrowDown, BarsArrowUp, Eye, ChatBubbleLeftEllipsis } from '$components/Icons';
  import { routes } from '$lib/config';
  import { parseCommunityCoverImage, scrollToElement } from '$lib/utils';
  import type { Community } from '$lib/types/api';
  import type { PageData } from './$types';
  import { getContext } from 'svelte';

  export let data: PageData;

  $: ({ store } = data);
  $: ({ data: storeData } = $store);
  $: community = storeData?.community as Community;
  $: message = Parser.parseFromCategory(community);

  // get deployment url
  let deploymentUrl = getContext<string>('deploymentUrl');

  // Helper to get avatarUrl by author name
  const author = [
    {
      name: 'Vadim Zolotokrylin',
      avatarUrl: 'https://storage.googleapis.com/holdex-public/thread/About%20Holdex/Vadim.jpg',
      authorUrl: deploymentUrl + '/c/learn/vadim-zolotokrylin',
    },
    {
      name: 'Mark Curchin',
      avatarUrl: 'https://storage.googleapis.com/holdex-public/thread/About%20Holdex/Mark.jpg',
      authorUrl: deploymentUrl + '/c/learn/mark-curchin',
    },
  ];

  let getAvatarUrl = (name: string) => {
    const found = author.find((item) => {
      const nameParts = item.name.split(' ');
      return item.name === name || nameParts.includes(name);
    });
    return found ? found.avatarUrl : undefined;
  };

  let getAuthorUrl = (name: string) => {
    const found = author.find((item) => {
      const nameParts = item.name.split(' ');
      return item.name === name || nameParts.includes(name);
    });
    return found ? found.authorUrl : undefined;
  };

  let getAuthorData = (name: string) => {
    const found = author.find((item) => {
      const nameParts = item.name.split(' ');
      return item.name === name || nameParts.includes(name);
    });
    return found ? found : undefined;
  };

  let renderTocPadding = (level: 'h2' | 'h3' | 'h4') => {
    switch (level) {
      case 'h3':
        return 'pl-8';
      case 'h4':
        return 'pl-16';
      default:
        return '';
    }
  };

  let getActiveToc = (url: URL, item: string) => {
    const tag = url.hash;
    return tag && tag.slice(1) === item ? '!text-t1' : '';
  };

  let tocOpen = false;
  let toggleToc = () => {
    tocOpen = !tocOpen;
  };

  let scrollTarget: { url: URL; item: string } | null = null;
  let handleOutroEnd = () => {
    if (scrollTarget !== null) {
      gotoTag(scrollTarget.url, scrollTarget.item);
    }
  };

  let gotoTag = (url: URL, item: string) => {
    // const currentUrl = url;
    // currentUrl.hash = item;
    scrollToElement(item, 64);
    scrollTarget = null;
    // return goto(currentUrl);
  };

  let handleClick = (url: URL, item: string) => {
    scrollTarget = { url, item };
  };
</script>

<MetaTags
  title="{message.title}{community.slug === 'jobs' ? ' - Job | Holdex' : ''}"
  description={message.subtitle ? message.subtitle : ''}
  pageType="article"
  path={routes.message(message.communitySlug, message.messageSlug)}
  imagePath={message.ogCover ? undefined : '/default-cover.png'}
  imageUrl={message.ogCover !== ''
    ? message.ogCover
    : message.cover !== ''
      ? message.cover
      : deploymentUrl + '/default-cover.png'}
/>

<template lang="pug" src="./template.pug">
</template>
