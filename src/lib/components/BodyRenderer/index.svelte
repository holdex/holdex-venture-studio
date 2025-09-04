<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from './item.svelte';

  export let blocks: any[];
</script>

{#each blocks as item, index}
  <Item {item} {index} />
{/each}

<style lang="sass">
	:global(.heading + ol), 
	:global(.heading + ul),
	:global(.heading + .video-player),
	:global(.heading + p),
	:global(.heading + blockquote),
	:global(.heading + pre),
	:global(.heading + table),
	:global(.heading + img),
	:global(.heading + .chart),
	:global(.heading + .cta),
	:global(.heading + .testimonial),
	:global(.heading + .team-member),
	:global(.heading + .link-block),
	:global(.heading + .embed)
		@apply -mt-7.25 xs:-mt-4
</style>
