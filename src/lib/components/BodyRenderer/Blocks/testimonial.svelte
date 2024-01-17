<script lang="ts">
  import type { TestimonialElement } from '$components/BodyParser/blocks';
  import Image from '$components/BodyRenderer/Blocks/image.svelte';
  import { ArrowTopRightOnSquare } from '$components/Icons';
  /* eslint-disable @typescript-eslint/no-unused-vars */

  export let item: TestimonialElement;
</script>

<div
  class="testimonial relative flex-col justify-start items-stretch w-full border border-solid border-l4 rounded-xl bg-l1 dark:bg-l2"
>
  <div class="flex flex-row border-b border-solid border-l4 p-4">
    <div class="flex rounded-full items-center">
      {#if item.picture}
        <img class="avatar rounded-full" src={item.picture.url} alt={item.picture.text} />
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
.testimonial
  &:before
    content: ""
    position: absolute
    top: 0px
    left: 10%
    width: 200px
    height: 1px
    background: linear-gradient(90deg, rgba(47, 50, 61, 0.00) 0.5%, rgba(0, 204, 255, 0.25) 25.56%, #0CF 50.63%, rgba(0, 204, 255, 0.25) 75.69%, rgba(47, 50, 61, 0.00) 100.75%) 
    background-repeat: no-repeat
    @media screen and (max-width: 450px)
      left: 5%
  &:after
    content: ""
    position: absolute
    bottom: 0px
    right: 10%
    width: 200px
    height: 1px
    background: linear-gradient(90deg, rgba(47, 50, 61, 0.00) 0.5%, rgba(0, 204, 255, 0.25) 25.56%, #0CF 50.63%, rgba(0, 204, 255, 0.25) 75.69%, rgba(47, 50, 61, 0.00) 100.75%)      
    background-repeat: no-repeat
    @media screen and (max-width: 450px)
      right: 5%
.avatar
  width: 48px 
  min-width: 48px
  margin: auto
</style>
