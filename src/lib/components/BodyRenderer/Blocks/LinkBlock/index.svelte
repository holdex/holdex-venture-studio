<script lang="ts">
  import { Link as LinkIcon } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { onMount } from 'svelte';
  import Link from './linkblocklink.svelte';
  import TextWrapper from '../textWrapper.svelte';
  import LinkBlockSleleton from './linkblockskeleton.svelte';

  type Item = {
    type: 'link';
    url: string;
    title: string;
    embed: string;
  };

  interface OgImage {
    url: string;
    type: string;
  }

  interface OgResult {
    success: number;
    link: string;
    meta: {
      title?: string;
      site_name?: string;
      description?: string;
      image?: OgImage;
    };
  }

  let imageLoaded: boolean = false;

  function onImageLoad() {
    imageLoaded = true;
  }

  export let item: Item;
  let metaInfo: OgResult;

  $: site = item.url;

  async function fetchMetaTags(url: string) {
    try {
      const response = await fetch(`/api/og-meta-data?site=${encodeURIComponent(url)}`);
      const data: OgResult = await response.json();
      metaInfo = data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  onMount(async () => {
    fetchMetaTags(site);
  });

  $: title = (metaInfo?.meta?.title ?? '') as string;
  $: description = (metaInfo?.meta?.description ?? '') as string;
  $: src = (metaInfo?.meta?.image?.url ?? '') as string;

  $: success = metaInfo?.success === 1;
</script>

<div
  class={`${
    metaInfo?.success === 0 ? 'hide-block' : 'flex'
  } link-block bg-l1  border border-solid border-l3 dark:bg-l2  rounded-xl`}
>
  {#if success}
    <div class={'image-link-container'}>
      {#if src}
        <div class="link-image-wrapper rounded-xl bg-l3">
          <img
            class={`link-image ${imageLoaded ? 'block' : 'hidden'} `}
            on:load={onImageLoad}
            {src}
            alt="Logo"
          />
        </div>
      {:else}
        <div class="icon-wrapper bg-l3">
          <Icon icon={LinkIcon} class="text-t3" width={30} height={30} />
        </div>
      {/if}
    </div>
    <div class={`link-details ${src ? 'padding-with-image' : 'padding-no-image'}`}>
      <div>
        <p class="ellipsis text-t1 title">{title}</p>
        <p class="ellipsis text-t3 description">{description}</p>
        <div class="link-wrapper">
          <Link {item} let:text>
            <TextWrapper {text} />
          </Link>
        </div>
      </div>
    </div>
  {:else}
    <LinkBlockSleleton />
  {/if}
</div>

<style lang="scss" src="./linkblock.scss"></style>
