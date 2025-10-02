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
  import PageTitle from '$components/PageTitle/index.svelte';

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
      "A partnership such as <a title='this one' href='https://hextrust.com/resources-collection/hex-trust-partners-with-holdex-to-bring-a-new-level-of-confidence-and-security-to-decentralized-fundraising' class='link s-CCQuTxjDzH6o' target='_blank' rel='noreferrer'><span class='!underline !underline-offset-4 s-CCQuTxjDzH6o' style='all: unset;'>this one</span></a> is something we're incredibly proud to be part of.",
    link: 'https://www.linkedin.com/in/alessioquaglini/',
    picture: {
      url: 'endorsements/alessio-quaglini.jpeg',
    },
  };
</script>

<MetaTags
  title="Our Portfolio of Startups | Holdex"
  description="Companies that drive the adoption of decentralized technologies and inclusive DeFi services."
  path={routes.portfolio}
  imagePath="/og/v2/portfolio.png"
/>

<template lang="pug" src="./template.pug">
</template>
