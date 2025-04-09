<script lang="ts">
  import type { TestimonialElement } from '$components/BodyParser/blocks';
  import Link from '$components/BodyRenderer/Blocks/link.svelte';
  export let item: TestimonialElement;

  const { name, title, content, link } = item;
  const picture = item.picture?.url || '';

  $: if (!name || !title || !content || !link) {
    throw new Error('Testimonial is missing required props');
  }
</script>

<template lang="pug" src="./template.pug"></template>
