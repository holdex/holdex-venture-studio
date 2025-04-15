<script lang="ts">
  import type { TestimonialElement } from '$components/BodyParser/blocks';
  import Link from '$components/BodyRenderer/Blocks/link.svelte';
  export let item: TestimonialElement;

  const picture =
    item.picture?.url && item.picture.url.trim() !== ''
      ? item.picture.url
      : '/empty-image-thumb.png';
</script>

<div
  class="testimonial-wrapper flex flex-col gap-4 w-full my-12 items-center smDown:items-start xl-up:py-10 xl-up:px-28 tb:py-20 pt-8 smDown:px-4"
>
  <div class="testimonial relative">
    <span
      class="absolute text-[201px] font-satoshi text-t3 -top-36 -left-25 tb:-left-2 tb:-top-24 tb:text-9xl sm:text-9xl sm:-top-20 sm:left-1 xs:text-9xl xs:-top-18 xs:left-1"
      >“</span
    >
    <div class="testimonial-text">
      <blockquote class="text-paragraph-l text-t2 xs:text-paragraph-s max-w-[604px]">
        {@html item.content}
      </blockquote>
    </div>
    <div class="author-info flex items-center justify-end gap-4 mt-4">
      <div
        class="author-details flex flex-col items-end text-right font-satoshi text-h5-l smDown:text-h5-s"
      >
        <Link
          item={{ type: 'link', href: item.link, text: item.name, title: item.name, iconSize: 20 }}
          >{item.name}</Link
        >
        <span class="text-h5-l smDown:text-h5-s w-fit">{item.title}</span>
      </div>
      <img src={picture} alt={item.name} class="h-14 w-14 rounded-xl" />
    </div>
  </div>
</div>
