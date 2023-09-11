<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from '../item.svelte';

  export let cells: any[];

  let isLeftEnd = true;
  let isRightEnd = false;
  let maxScroll;
  let hasRoomToScrollRight = 0;
  let hasRoomToScrollLeft = 0;

  let tableWidth;

  const scrollAction = (node: HTMLElement) => {
    const hasReachedRightEnd = () => {
      const tableScrollElement = document.getElementById('table-scroll');

      if (!node || !tableScrollElement) {
        return;
      }

      maxScroll = tableScrollElement.clientWidth - node!.parentElement!.clientWidth;

      hasRoomToScrollLeft = node?.scrollLeft;

      isLeftEnd = hasRoomToScrollLeft === 0;

      hasRoomToScrollRight = maxScroll - hasRoomToScrollLeft;

      isRightEnd = maxScroll - hasRoomToScrollRight >= 0;

      if (
        (!isLeftEnd && hasRoomToScrollLeft === node.scrollWidth - node.offsetWidth) ||
        hasRoomToScrollRight === 0
      ) {
        isRightEnd = !isRightEnd;
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
