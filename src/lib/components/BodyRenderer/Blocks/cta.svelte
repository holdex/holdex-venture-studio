<script lang="ts">
  import type { CTAElement } from '$components/BodyParser/blocks';
  import Button from '$components/Button/index.svelte';
  /* eslint-disable @typescript-eslint/no-unused-vars */

  export let item: CTAElement;
</script>

<div
  class="relative cta flex flex-row xs:flex-col gap-6 w-full border border-solid border-l4 rounded-xl p-4 bg-l1 dark:bg-l2"
>
  <div class="flex flex-col xs:w-full">
    {#if item.title}
      <p class="text-cta font-bold">{item.title}</p>
    {/if}

    {#if item.description}
      <p class="text-cta text-t3">{item.description}</p>
    {/if}
  </div>

  <div class="ml-auto cta-buttons dark:cta-buttons-dark flex flex-row gap-4 xs:flex-col xs:w-full">
    {#if item.link1}
      <Button
        class="cta-button text-t4"
        variant="primary"
        size="large"
        href={item.link1.url}
        label={item.link1.text}
      />
    {/if}

    {#if item.link2}
      <Button
        class="cta-button text-t1 border-secondary"
        variant="secondary"
        size="large"
        href={item.link2.url}
        label={item.link2.text}
      />
    {/if}
  </div>
</div>

<style lang="sass">
  .cta 
    .cta-buttons 
      :global(.cta-button) 
        @apply my-auto font-bold text-[14px]
      :global(:is([data-theme="light"] .border-secondary)) 
        border: 1px solid var(--layer-light-05, #CED1DB)
      :global(:is([data-theme="dark"] .border-secondary))
        border: none

      &:before,
      &:after 
        content: ""
        position: absolute
        display: block
        width: 200px
        height: 1px
        background: linear-gradient(90deg, rgba(47, 50, 61, 0.00) 0.5%, #2E83E5 25.56%, #2E83E5 50.63%, rgba(46, 131, 229, 0.25) 75.69%, rgba(47, 50, 61, 0.00) 100.75%)
        background-repeat: no-repeat
      &:before 
        top: -1px
        left: 50px
      &:after 
        bottom: -1px
        right: 50px
      @media screen and (max-width: 767px) 
        &:before 
          left: 20px
        &:after 
          right: 20px
</style>
