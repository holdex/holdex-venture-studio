<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import { Switch, Case } from '$components/Switch';

  import InlineBlock from './inline.svelte';
  import NestedList from './Blocks/nestedList.svelte';
  import Image from './Blocks/image.svelte';
  import Embed from './Blocks/embed.svelte';
  import EmbedGist from './Blocks/gist.svelte';
  import TallyButton from './Blocks/tallyButton.svelte';
  import Chart from './Blocks/chart.svelte';
  import Table from './Blocks/table.svelte';
  import CTA from './Blocks/cta.svelte';
  import Testimonial from './Blocks/testimonial.svelte';
  import LinkBlock from './Blocks/linkBlock.svelte';
  import { parseTableCell } from '../BodyParser/blocks';
  import TeamMemberCard from '$components/TeamMemberCard/index.svelte';

  import { onMount, tick } from 'svelte';

  export let item: any;
  export let isTableCell: boolean;
  export let index: number;

  let headingElement: HTMLElement | undefined;

  onMount(async () => {
    if (item.level === 'h1' || item.level === 'h2' || item.level === 'h3') {
      await tick();
      setTimeout(() => checkSingleLine(), 100);
    }
  });

  function checkSingleLine() {
    if (
      item.type === 'heading' &&
      (item.level === 'h1' || item.level === 'h2' || item.level === 'h3') &&
      headingElement
    ) {
      const tempElement = document.createElement(item.level);
      tempElement.innerHTML = headingElement.innerHTML;
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      tempElement.style.whiteSpace = 'nowrap';
      tempElement.style.width = 'auto';

      tempElement.className = headingElement.className.replace('!pt-0', '').trim();

      document.body.appendChild(tempElement);
      const singleLineHeight = tempElement.offsetHeight;

      document.body.removeChild(tempElement);

      const actualHeight = headingElement.offsetHeight;

      const tolerance = 5;
      const isSingleLine = actualHeight <= singleLineHeight + tolerance;

      if (isSingleLine) {
        headingElement.classList.add('!pt-0');
      }
    }
  }
</script>

<template lang="pug" src="./item.pug">
</template>
