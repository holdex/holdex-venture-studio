<script lang="ts">
  import { Link as LinkIcon } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { onMount} from 'svelte';
  import LinkText from './linkText.svelte';
  import TextWrapper from '../textWrapper.svelte';
  import Skeleton from './skeleton.svelte';
  import { getContext } from 'svelte';
  import { regExp } from '$components/BodyParser/utils';

  type Item = {
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

  let themeContext: any = getContext('theme');

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
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      const data: OgResult = await response.json();
      metaInfo = data;
    } catch (error: any) {
      console.error(error?.message || 'An unexpected error occurred');
    }
  }

  onMount(() => {
    fetchMetaTags(site);
  });

  $: isHoldexLink = regExp.holdexLink.test(item.url);

  $: title = (metaInfo?.meta?.title ?? '') as string;
  $: description = (metaInfo?.meta?.description ?? '') as string;
  $: url = (metaInfo?.link ?? '') as string;
  $: src = (metaInfo?.meta?.image?.url ?? '') as string;
  $: success = metaInfo?.success === 1;
</script>

<a
  title={title ? title : ''}
  href={url}
  target={isHoldexLink ? '_self' : '_blank'}
  rel="noreferrer"
  class={`link-block bg-l1 flex dark:bg-l2  border border-solid border border-l4 shadow-accent1-default rounded-xl
    ${$themeContext === 'dark' ? 'dark-hover' : 'light-hover'}
    `}
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
        <div class="flex ellipsis items-center text-sm font-medium leading-5">
          <LinkText href={url} let:text>
            <TextWrapper {text} />
          </LinkText>
        </div>
      </div>
    </div>
  {:else}
    <Skeleton />
  {/if}
</a>

<style lang="scss" src="./linkblock.scss"></style>
