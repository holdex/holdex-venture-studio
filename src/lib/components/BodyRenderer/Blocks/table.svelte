<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from '../item.svelte';

  export let cells: any[];

  let secondaryNavScrollLeft = 0;
  let isLeftEnd = true;
  let isRightEnd = false;
  let w;

  const scrollAction = (node: HTMLElement) => {
    const hasReachedRightEnd = () => {
      const navbarSectionElement = document.getElementById('table-scroll');

      if (!node || !navbarSectionElement) {
        return;
      }

      secondaryNavScrollLeft = node?.scrollLeft;
      isLeftEnd = secondaryNavScrollLeft === 0;
      isRightEnd =
        secondaryNavScrollLeft + node.clientWidth === navbarSectionElement.clientWidth
          ? false
          : true;
    };

    node.addEventListener('scroll', hasReachedRightEnd, false);
    return {
      destory() {
        node.removeEventListener('scroll', hasReachedRightEnd);
      },
    };
  };
</script>

<div class="w-full" bind:clientWidth={w}>
  <template lang="pug" src="./table.pug">
  </template>
</div>
