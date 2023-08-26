<script lang="ts">
  import { onMount } from 'svelte';
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from '../item.svelte';

  export let cells: any[];
  let secondaryNavScrollLeft = 0;
  let isLeftEnd = true;
  let isRightEnd = undefined;
  let mobile = false;
  let tableWidth;

  onMount(() => {
    window.addEventListener('resize', () => (mobile = window.innerWidth < 550));

    return () => {
      window.removeEventListener('resize', () => (mobile = window.innerWidth < 550));
    };
  });

  const scrollAction = (node: HTMLElement) => {
    const hasReachedRightEnd = () => {
      const tableScrollElement = document.getElementById('table-scroll');

      if (!node || !tableScrollElement) {
        return;
      }

      secondaryNavScrollLeft = node?.scrollLeft;

      isLeftEnd = secondaryNavScrollLeft === 0;
      isRightEnd =
        secondaryNavScrollLeft + node.clientWidth === tableScrollElement.clientWidth ? true : false;
    };

    node.addEventListener('scroll', hasReachedRightEnd, false);

    return {
      destory() {
        node.removeEventListener('scroll', hasReachedRightEnd);
      },
    };
  };
</script>

<div class="w-full" bind:clientWidth={tableWidth}>
  <template lang="pug" src="./table.pug">
  </template>
</div>
