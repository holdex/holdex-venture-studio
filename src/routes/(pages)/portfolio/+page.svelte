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
  import Testimonial from '$components/BodyRenderer/Blocks/testimonial.svelte';

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

  const testimonial_jakob = {
    name: 'Jakob Kronbichler',
    title: 'CEO & Co-Founder at Clearpool',
    content:
      "Since day one, Holdex has spearheaded the product development and launch of the Clearpool protocol. Thanks to Holdex's team efforts, our product has facilitated over $650 million in loans in the two years since its launch.",
    link: 'https://www.linkedin.com/in/jakob-kronbichler-73737746',
    picture: {
      url: 'endorsements/jakob-kronbichler.png',
    },
  };

  const testimonial_dimitrios = {
    name: 'Dimitrios Kavvathas',
    title: 'Founder at Ithaca Protocol',
    content:
      'Holdex played a key role in building our Telegram mini-app and in developing and executing a revamped user acquisition strategy. Ithaca Protocol has benefited tremendously from their invaluable venture-building expertise!',
    link: 'https://www.linkedin.com/in/dimitrios-kavvathas-3bb3654/',
    picture: {
      url: 'endorsements/dimitrios-kavvathas.jpeg',
    },
  };

  const testimonial_alessio = {
    name: 'Alessio Quaglini',
    title: 'Co-founder & CEO at Hex Trust',
    content:
      "A partnership such as <a title='this one' href='https://hextrust.com/resources-collection/hex-trust-partners-with-holdex-to-bring-a-new-level-of-confidence-and-security-to-decentralized-fundraising' class='w-fit relative inline-block bg-accent1-default/15 text-accent1-default transition-colors hover:bg-accent1-default/25 focus:bg-accent1-default/25 s-CCQuTxjDzH6o' target='_blank' rel='noreferrer'><span class='!underline !underline-offset-4 s-CCQuTxjDzH6o' style='all: unset;'>this one</span> <svg class='icon inline-flex relative color-inherited s-ZVhizgp2pUhH' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true' width='16' height='16'><path fill-rule='evenodd' d='M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z' clip-rule='evenodd' class='s-ZVhizgp2pUhH'></path></svg><!--<Index>--></a> is something we're incredibly proud to be part of.",
    link: 'https://www.linkedin.com/in/alessioquaglini/',
    picture: {
      url: 'endorsements/alessio-quaglini.jpeg',
    },
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
