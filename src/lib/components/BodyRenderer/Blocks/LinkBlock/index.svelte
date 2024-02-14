<script lang="ts">
  import { Link as LinkIcon } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { onMount, onDestroy } from 'svelte';
  import Link from './linkblocklink.svelte';
  import TextWrapper from '../textWrapper.svelte';
  import LinkBlockSleleton from './linkblockskeleton.svelte';
  import { getContext } from 'svelte';
  import { regExp } from '$components/BodyParser/utils';

  let themeContext: any = getContext('theme');

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
    } catch (error) {
      console.error(error);
    }
  }

  let active: boolean = false;
  let componentElement: HTMLElement;

  onMount(async () => {
    fetchMetaTags(site);

    const handleClickOutside = (event: MouseEvent) => {
      if (componentElement && !componentElement.contains(event.target as Node)) {
        active = false;
      }
    };

    document.addEventListener('click', handleClickOutside);

    onDestroy(() => {
      document.removeEventListener('click', handleClickOutside);
    });
  });

  const handleClick = () => {
    active = !active;
  };

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  $: isHoldexLink = regExp.holdexLink.test(item.url);

  $: title = (metaInfo?.meta?.title ?? '') as string;
  $: description = (metaInfo?.meta?.description ?? '') as string;
  $: src = (metaInfo?.meta?.image?.url ?? '') as string;

  $: success = metaInfo?.success === 1;

</script>

<a
title={item.title ? item.title : ''}
href={item.url}
target={isHoldexLink ? '_self' : '_blank'}
rel="noreferrer"
  class={`link-block bg-l1 dark:bg-l2  border border-solid border border-l4 shadow-accent1-default rounded-xl
    ${metaInfo?.success === 0 ? 'hide-block' : 'flex'}
    ${$themeContext === 'dark' ? 'dark-hover' : 'light-hover'}
    ${active ? ($themeContext === 'dark' ? 'dark-shadow' : 'light-shadow') : ''}`}
  bind:this={componentElement}
  on:click={handleClick}
  on:keydown={handleKeydown}
>
  {#if success}
    <div class={'image-link-container'}>
      {#if src}
        <div class="link-image-wrapper rounded-xl">
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
  </a>

<style lang="scss" src="./linkblock.scss"></style>
