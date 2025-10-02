<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import MetaTags from '$components/MetaTags/index.svelte';
  import Parser, { type Message } from '$components/BodyParser';
  import BodyRenderer from '$components/BodyRenderer/index.svelte';
  import PageTitleImage from '$components/PageTitleImage/index.svelte';
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
  title={message.title}
  description={message.subtitle}
  path={routes.about}
  imagePath="/og/v2/about.png"
/>

<template lang="pug" src="./template.pug">
</template>
