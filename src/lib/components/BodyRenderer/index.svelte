<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import Item from './item.svelte';
  import { parseTestimonialSection } from './utils';
  import type { TestimonialElement } from '$components/BodyParser/blocks';

  export let blocks: any[];
  $: parsedBlocks = blocks.map((block) => {
    if (block.type == 'table') {
      const testimonial = parseTestimonialSection(block.cells);
      if (testimonial != undefined) {
        return {
          type: 'testimonial',
          data: testimonial,
        };
      }
    }
    return block;
  });
</script>

{#each parsedBlocks as item, index}
  <Item {item} {index} />
{/each}

<style lang="sass">
	:global(.heading + ol), 
	:global(.heading + ul),
	:global(.heading + .video-player),
	:global(.heading + p)
		@apply -mt-8 xs:-mt-4
</style>
