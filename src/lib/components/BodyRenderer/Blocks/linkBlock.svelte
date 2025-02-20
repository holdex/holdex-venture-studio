<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { ArrowTopRightOnSquare, Link } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { regExp } from '$components/BodyParser/utils';

  // TODO: Move fetch logic to server-side once API integration is complete
  // ======================================================================
  async function fetchOg(url: string) {
    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      item = await response.json();
    } catch (error: any) {
      console.error(error?.message || 'An unexpected error occurred');
    }
  }

  onMount(() => {
    fetchOg(item?.url);
  });
  // ======================================================================

  type OpenGraphResponse = {
    url: string;
    title: string;
    description: string;
    imageUrl: string | null;
    embed: string;
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
  target="_blank"
  rel="noreferrer"
  class="link-card {theme === 'dark' ? 'dark-hover' : 'light-hover'}"
>
  <div class="linkblock-wrapper">
    <div class="image-container">
      {#if imageUrl}
        <div class="preview-wrapper">
          <img src={imageUrl} alt="Link preview" class="preview-image" />
        </div>
      {:else}
        <div class="fallback-icon">
          <Icon icon={Link} class="text-t3" width={24} height={24} />
        </div>
      {/if}
    </div>
    <div class="content-wrapper">
      <h3 class="title">{title}</h3>
      {#if description}
        <p class="description">{description}</p>
      {/if}
      <div class="url-wrapper">
        <div class="url-content">
          <span class="truncate">{truncateUrl(url)}</span>
          {#if !isHoldexLink}
            <Icon icon={ArrowTopRightOnSquare} width={12} height={12} colorInherit />
          {/if}
        </div>
      </div>
    </div>
  </div>
</a>

<style lang="scss">
  .link-card {
    @apply block w-full h-[96px] border-solid border border-l4 rounded-xl shadow-accent1-default overflow-hidden active:border-accent1-default focus:border-accent1-default;
  }

  .light-hover:hover,
  .dark-hover:hover {
    @apply bg-l3 transition-colors duration-100 ease-in-out;
  }

  .linkblock-wrapper {
    @apply flex items-center gap-4 w-full h-full;
  }

  .image-container {
    @apply flex-shrink-0;
  }

  .preview-wrapper {
    @apply flex justify-center items-center rounded-xl;
  }

  .preview-image {
    @apply w-[128px] h-[88px] rounded-lg object-cover;
  }

  .fallback-icon {
    @apply flex items-center justify-center w-10 h-10 rounded-full bg-l3 ml-4;
  }

  .content-wrapper {
    @apply flex flex-col gap-1 justify-center overflow-hidden;
  }

  .title {
    @apply truncate font-bold text-t1 text-sm w-full pr-4;
  }

  .description {
    @apply truncate text-t3 text-sm w-full pr-4;
  }

  .url-wrapper {
    @apply w-full text-sm flex items-center;
  }

  .url-content {
    @apply underline underline-offset-4 bg-accent1-default/15 text-accent1-default transition-colors hover:bg-accent1-default/25 focus:bg-accent1-default/25;
  }
</style>
