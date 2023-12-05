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
        <p class="text-cta text-t3 dark:text-t2">{item.description}</p>
      {/if}
    </div>

    {#if item.link1}
      <Button variant="primary" size="large" href={item.link1.url}>
        <p class="buttontext text-t4">{item.link1.text}</p>
      </Button>
    {/if}

    {#if item.link2}
      <Button variant="secondary" size="large" href={item.link2.url}>
        <p class="buttontext text-t1 border-1 border">{item.link2.text}</p>
      </Button>
    {/if}
  </div>
</div>

<style lang="sass">
  .buttontext
    padding: 0.5em
    line-height: 32px !important
    font-weight: 700 !important
    text-align: center
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
