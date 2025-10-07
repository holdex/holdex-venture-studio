<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import MetaTags from '$components/MetaTags/index.svelte';
  import Parser, { type Message } from '$components/BodyParser';
  import BodyRenderer from '$components/BodyRenderer/index.svelte';
  import PageTitle from '$components/PageTitle/index.svelte';
  import ArticleHeaderImage from '$components/ArticleHeaderImage/index.svelte';
  import { routes } from '$lib/config';
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ store } = data);
  $: ({ data: storeData } = $store);
  $: message = Parser.parse(storeData?.message as Message);

  // detect version from url query parameter
  $: isV2 = $page.url.searchParams.get('v2') === 'true';
</script>

<MetaTags
  title="For Startups"
  description="Learn about our partnership recipe that empowers the company success"
  path={routes.forStartups}
  imagePath="/og/for-startups.png"
/>

<template lang="pug" src="./template.pug">
</template>
