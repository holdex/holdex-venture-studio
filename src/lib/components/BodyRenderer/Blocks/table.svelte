<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from '../item.svelte';

  export let cells: any[];

  let isLeftEnd = true;
  let isRightEnd = false;
  let maxScroll;
  let isScroller = false;

  let tableWidth;

  const hasScroll = (element: any, direction: any) => {
    direction = direction === 'vertical' ? 'scrollTop' : 'scrollLeft';

    let result = !!element[direction];

    if (!result) {
      element[direction] = 1;
      result = !!element[direction];
      element[direction] = 0;
    }
    return result;
  };

  const scrollAction = (node: HTMLElement) => {
    isScroller = hasScroll(node, 'horizontal');
    const hasReachedRightEnd = () => {
      const tableScrollElement = document.getElementById('table-scroll');

      if (!node || !tableScrollElement) {
        return;
      }

      maxScroll = tableScrollElement.clientWidth - node!.parentElement!.clientWidth;

      isLeftEnd = node?.scrollLeft === 0;
      isRightEnd = maxScroll === node?.scrollLeft;
    };

    node.addEventListener('scroll', hasReachedRightEnd, false);

    hasReachedRightEnd();

    return {
      destory() {
        node.removeEventListener('scroll', hasReachedRightEnd);
      },
    };
  };
</script>

{#if cells.length}
  <div
    class="md-up:w-[604px] lg-up:w-[710px] xs:w-full xs:left-0 relative tablescroll p-3 w-full text-left z-1"
  >
    <div class="w-full" bind:clientWidth={tableWidth}>
      <template lang="pug" src="./table.pug">
      </template>
    </div>
  </div>
{/if}
