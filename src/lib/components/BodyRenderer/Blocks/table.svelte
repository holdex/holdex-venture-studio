<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from '../item.svelte';

  export let cells: any[];

  let isLeftEnd = true;
  let isRightEnd = false;
  let maxScroll: number;
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
    const tableScrollElement = document.getElementById('table-scroll');

    const maxScrollLeft = node?.scrollWidth - node?.clientWidth;
    maxScroll = tableScrollElement!.clientWidth - node!.parentElement!.clientWidth;

    const hasReachedRightEnd = () => {
      if (!node || !tableScrollElement) {
        return;
      }
      isLeftEnd = node?.scrollLeft === 0;
      isRightEnd = maxScroll === node?.scrollLeft;

      if (isRightEnd) {
        isScroller = false;
      }

      if (!isRightEnd) {
        isScroller = hasScroll(node, 'horizontal');
      }

      if (maxScrollLeft === node?.scrollLeft) {
        isRightEnd = true;
      }
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
