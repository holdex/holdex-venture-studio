<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import MetaTags from '$components/MetaTags/index.svelte';
  import Parser, { type Message } from '$components/BodyParser';
  import BodyRenderer from '$components/BodyRenderer/index.svelte';
  import PageTitle from '$components/PageTitle/index.svelte';
  import { routes } from '$lib/config';
  import type { PageData } from './$types';

  export let data: PageData;

  $: theme = globalThis.localStorage?.getItem('theme') as 'dark' | 'light' | undefined | null;
  $: themeIconName = theme ? (theme === 'dark' ? 'sun' : 'moon') : 'sun';

  $: ({ store } = data);
  $: ({ data: storeData } = $store);
  $: message = Parser.parse(storeData?.message as Message);
</script>

<MetaTags
  title="For Startups"
  description="Learn about our partnership recipe that empowers the company success"
  path={routes.forStartups}
  imagePath="/og/v2/for-startups.png"
/>

<template lang="pug" src="./template.pug">
</template>
