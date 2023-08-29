<script lang="ts">
  import { onMount } from 'svelte';
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from '../item.svelte';

  export let cells: any[];
  let hasRoomToScrollLeft = 0;
  let isLeftEnd = true;
  let isRightEnd = undefined;
  let mobile = false;
  let tableWidth;

  onMount(() => {
    const tableScrollElement = document.getElementById('table-scroll');

    mobile = window.innerWidth < 550;

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

      const maxScroll = tableScrollElement.clientWidth - node.clientWidth;
      hasRoomToScrollLeft = node?.scrollLeft;

      isLeftEnd = hasRoomToScrollLeft === 0;

      const scrollBuffer = maxScroll - hasRoomToScrollLeft;
      const hasRoomToScrollRight =
        scrollBuffer + hasRoomToScrollLeft + node.clientWidth === tableScrollElement.clientWidth ||
        hasRoomToScrollLeft + node.clientWidth === tableScrollElement.clientWidth;
      isRightEnd = !isLeftEnd && hasRoomToScrollRight;
    };

    node.addEventListener('scroll', hasReachedRightEnd, false);

    return {
      destory() {
        node.removeEventListener('scroll', hasReachedRightEnd);
      },
    };
  };
</script>

<div class="w-[710px] -left-[53px] xs:w-full xs:left-0 relative">
  <div class="w-full" bind:clientWidth={tableWidth}>
    <template lang="pug" src="./table.pug">
    </template>
  </div>
</div>
