<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import MetaTags from '$components/MetaTags/index.svelte';
  import Parser, { type Message } from '$components/BodyParser';
  import BodyRenderer from '$components/BodyRenderer/index.svelte';
  import PageTitle from '$components/PageTitle/index.svelte';
  import { routes } from '$lib/config';
  import type { PageData } from './$types';
  import { page } from '$app/stores';

  export let data: PageData;

  $: ({ store } = data);
  $: ({ data: storeData } = $store);
  $: message = Parser.parse(storeData?.message as Message);

  // detect version from url query parameter
  $: isV2 = $page.url.searchParams.get('v2') === 'true';
</script>

<MetaTags
  title={message.title}
  description={message.subtitle}
  path={routes.about}
  imagePath={isV2 ? '/og/v2/about.png' : '/og/about.png'}
/>

<template lang="pug" src="./template.pug">
</template>
