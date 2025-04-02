<script lang="ts">
  import type { TeamMemberBlock } from '$components/BodyParser/blocks';
  import TextParagraph from '$components/TextParagraph/index.svelte';

  export let item: TeamMemberBlock;

  let { name, role, description, image, link } = item.data;

  $: if (!name || !role || !description || !image) {
    throw new Error('Team member card is missing required props');
  }
</script>

<template lang="pug" src="./template.pug"></template>
