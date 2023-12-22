<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from './item.svelte';

  export let blocks: any[];
  $: addtionalBlocks = [
    ...blocks,
    {
      type: 'cta',
      data: {
        title: '123',
        description: 'CTa test description',
        link1: {
          text: 'Button 1',
          url: 'https://google.com',
        },
        link2: {
          text: 'Button 2',
          url: 'https://google.com',
        },
      },
    },
  ];
</script>

{#each blocks as item, index}
  <Item {item} {index} />
{/each}

<style lang="sass">
	:global(.heading + ol), 
	:global(.heading + ul),
	:global(.heading + .video-player),
	:global(.heading + p)
		@apply -mt-8 xs:-mt-4
</style>
