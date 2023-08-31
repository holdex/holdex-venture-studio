<script lang="ts">
  import { onMount } from 'svelte';
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from '../item.svelte';

  export let cells: any[];
  let hasRoomToScrollLeft = 0;
  let isLeftEnd = true;

  let isRightEnd = undefined;
  let hasRoomToScrollRight = false;
  let tableWidth;
  const tableIsScrollable = 583;

  onMount(() => {
    const tableScrollElement = document.getElementById('table-scroll');

    hasRoomToScrollRight = window.innerWidth < tableIsScrollable;

    window.addEventListener(
      'resize',
      () => (hasRoomToScrollRight = window.innerWidth < tableIsScrollable)
    );

    return () => {
      window.removeEventListener(
        'resize',
        () => (hasRoomToScrollRight = window.innerWidth < tableIsScrollable)
      );
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

      isRightEnd = maxScroll - scrollBuffer === node?.scrollWidth - node.clientWidth;
      const hasRoomToScrollRight = scrollBuffer > 0 || isRightEnd;
    };

    node.addEventListener('scroll', hasReachedRightEnd, false);

    return {
      destory() {
        node.removeEventListener('scroll', hasReachedRightEnd);
      },
    };
  };
</script>

<div class="md-up:w-[604px] lg-up:w-[710px] xs:w-full xs:left-0 relative tablescroll">
  <div class="w-full" bind:clientWidth={tableWidth}>
    <template lang="pug" src="./table.pug">
    </template>
  </div>
</div>
