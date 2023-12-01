<script lang="ts">
  import type { CTAElement } from '$components/BodyParser/blocks';
  import Button from '$components/Button/index.svelte';
  /* eslint-disable @typescript-eslint/no-unused-vars */

  export let item: CTAElement;
</script>

<div class="relative">
  <div
    class="gradient flex flex-row xs:flex-col gap-4 items-center w-full border border-solid border-l4 rounded-xl p-4 bg-l1 dark:bg-l2"
  >
    <div class="flex flex-col xs:pb-4">
      {#if item.title}
        <p class="text-cta-title">{item.title}</p>
      {/if}

      {#if item.description}
        <p class="text-cta text-t3">{item.description}</p>
      {/if}
    </div>
    {#if item.link1}
      <a
        class="text-center relative xs:w-full bg-accent1-default text-t4 text-button border border-solid border-transparent shadow-button flex items-center justify-center p-4 xs:py-2 rounded-xl transition-all focus:bg-accent1-default hover:bg-accent1-active dark:hover:shadow-button-hover"
        href={item.link1.url}>{item.link1.text}</a
      >
    {/if}

    {#if item.link2}
      <a
        class="relative xs:w-full bg-l1 text-t1 text-button border border-solid border-l5 shadow-secondary-button items-center justify-center p-4 xs:py-2 rounded-xl hover:!border-accent1-active focus:!border-accent1-active dark:bg-l3 dark:border-l3 dark:hover:shadow-secondary-button-hover"
        href={item.link2.url}>{item.link2.text}</a
      >
    {/if}
  </div>
</div>

<style lang="sass">
  .text-button
    line-height: 32px
    font-weight: 700
    left: 0
  .gradient
    &:before
      content: ""
      position: absolute
      display: block
      top: -0.5px
      left: 40px
      width: 300px
      height: 1.5px
      background-image:  linear-gradient(to right, #00000000 5%, #2E83E5A0, #00000000, #00000000, #00000000)
      background-repeat: no-repeat
    &:after
      content: ""
      position: absolute
      display: block
      bottom: 0px
      right: 0px
      width: 300px
      height: 1.5px
      background-image:  linear-gradient(to right, #00000000 5%, #2E83E5A0, #00000000, #00000000, #00000000)
      background-repeat: no-repeat
</style>
