<script lang="ts">
  import type { TestimonialElement } from '$components/BodyParser/blocks';
  import Image from '$components/BodyRenderer/Blocks/image.svelte';
  import { ArrowTopRightOnSquare } from '$components/Icons';
  /* eslint-disable @typescript-eslint/no-unused-vars */

  export let item: TestimonialElement;
</script>

<div
  class="relative flex flex-col justify-start items-stretch w-full border border-solid border-l4 rounded-xl bg-l1 dark:bg-l2"
>
  <div class="flex flex-row border-b border-solid border-l4 p-4">
    <div class="flex rounded-full items-center">
      {#if item.picture}
        <img
          class="rounded-full my-auto"
          src={item.picture.url}
          width={'48px'}
          height={'48px'}
          style="max-height: 48px; margin:auto"
        />
      {/if}
    </div>
    <div class="flex flex-col xs:w-full ml-4">
      {#if item.name}
        <p class="text-paragraph-l text-t1 font-bold">{item.name}</p>
      {/if}

      {#if item.title}
        <p class="text-paragraph-l text-t3">{item.title}</p>
      {/if}
    </div>
  </div>
  <div class="flex flex-col xs:w-full p-4">
    {#if item.content}
      <p class="text-paragraph-l text-t2">{item.content}</p>
    {/if}
  </div>
</div>

<style lang="sass">

</style>
