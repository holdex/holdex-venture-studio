<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { ArrowTopRightOnSquare, Link } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { regExp } from '$components/BodyParser/utils';

  let isLoading = false;

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  async function fetchOg(url: string) {
    isLoading = true;
    try {
      if (!url || !isValidUrl(url)) {
        throw new Error('Invalid URL provided');
      }
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      item = await response.json();
    } catch (error: any) {
      console.error(error?.message || 'An unexpected error occurred');
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    fetchOg(item?.url);
  });

  type OpenGraphResponse = {
    url: string;
    title: string;
    description: string;
    imageUrl: string | null;
  };

  let theme = getContext('theme');
  export let item: OpenGraphResponse;

  $: url = item?.url ?? '';
  $: title = item?.title ?? '';
  $: imageUrl = item?.imageUrl ?? '';
  $: description = item?.description ?? '';
  $: isHoldexLink = regExp.holdexLink.test(url);

  const truncateUrl = (url: string) => {
    const textWithoutPrefix = url.replace(/^https?:\/\//, '');
    const domain = textWithoutPrefix.split('/')[0];
    return domain;
  };
</script>

<a
  href={url}
  title={title ? title : ''}
  target={isHoldexLink ? '_self' : '_blank'}
  rel="noreferrer"
  class="block w-full h-[96px] border-solid border border-l4 rounded-xl shadow-accent1-default overflow-hidden active:border-accent1-default focus:border-accent1-default hover:bg-l3 dark:hover:bg-l3 transition-colors duration-100 ease-in-out"
>
  <div class="flex items-center gap-4 w-full h-full">
    {#if isLoading}
      <div class="flex items-center gap-4 w-full h-full pl-1">
        <div class="w-[128px] h-[88px] rounded-lg bg-l3 animate-pulse" />
        <div class="flex flex-col gap-2 flex-1">
          <div class="h-4 w-1/2 rounded bg-l3 animate-pulse" />
          <div class="h-4 w-3/4 rounded bg-l3 animate-pulse" />
          <div class="h-4 w-1/4 rounded bg-l3 mt-1 animate-pulse" />
        </div>
      </div>
    {:else}
      <div class="flex-shrink-0">
        {#if imageUrl}
          <div class="flex justify-center items-center rounded-xl pl-1">
            <img
              src={imageUrl}
              alt="Link preview"
              class="w-[128px] h-[88px] rounded-lg object-cover"
            />
          </div>
        {:else}
          <div class="flex items-center justify-center w-10 h-10 rounded-full bg-l3 ml-4">
            <Icon icon={Link} class="text-t3" width={24} height={24} />
          </div>
        {/if}
      </div>
      <div class="flex flex-col gap-1 justify-center overflow-hidden">
        <h3 class="truncate font-bold text-t1 text-sm w-full pr-4">{title}</h3>
        {#if description}
          <p class="truncate text-t3 text-sm w-full pr-4">{description}</p>
        {/if}
        <div class="w-full text-sm flex items-center">
          <div
            class="flex border-b bg-accent1-default/15 text-accent1-default transition-colors hover:bg-accent1-default/25 focus:bg-accent1-default/25"
          >
            <span class="truncate">{truncateUrl(url)}</span>
            {#if !isHoldexLink}
              <div class="relative left-[1px] bottom-[1.5px]">
                <Icon icon={ArrowTopRightOnSquare} width={12} height={12} colorInherit />
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
</a>

<style lang="scss">
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
