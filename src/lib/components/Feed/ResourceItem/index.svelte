<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import TextParagraph from '$components/TextParagraph/index.svelte';
  import type { ParsedMessage } from '$components/BodyParser';
  import Hashtag from '$components/BodyRenderer/Blocks/hashtag.svelte';
  import Link from '$components/BodyRenderer/Blocks/link.svelte';

  export let message: ParsedMessage;
  let className = '';
  export { className as class };
</script>

<template lang="pug" src="./template.pug">
</template>
