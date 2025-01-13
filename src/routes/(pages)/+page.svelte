<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import MetaTags from '$components/MetaTags/index.svelte';
  import Parser, { type Message } from '$components/BodyParser';
  import BodyRenderer from '$components/BodyRenderer/index.svelte';
  import TextHighlight from '$components/TextHighlight/index.svelte';
  import CompanyLogoStrip from '$components/CompanyLogoStrip/index.svelte';
  import { signature } from '$components/Icons';
  import { routes } from '$lib/config';
  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ store } = data);
  $: ({ data: storeData } = $store);
  $: message = Parser.parse(storeData?.message as Message);

  function sanitizeStyle(style: string): string {
    const allowedStyles = /^(background-image|padding):[\w\s,.#%-]+;$/;
    return allowedStyles.test(style) ? style : '';
  }

  $: backgroundStyle = sanitizeStyle(
    'background-image: linear-gradient(176deg, #1C202D 20%, #10141F 30%); padding: 0.0625rem;'
  );
  $: gradientStyle = sanitizeStyle(
    'background-image: linear-gradient(165deg, #393F4F 20%, #10141F 40%); padding: 0.0625rem;'
  );
  
</script>

<MetaTags
  title={message.title}
  description={message.subtitle}
  path={routes.index}
  imagePath="/og/index.png"
/>

<template lang="pug" src="./template.pug">
</template>
