<script lang="ts">
  import { goto } from '$app/navigation';
  import { regExp } from '$components/BodyParser/utils';
  import { ArrowTopRightOnSquare } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { isBrowser } from '$lib/config';
  import { Link } from '@steeze-ui/heroicons';

  type Item = {
    type: string;
    text: string;
    href: string;
    title?: string;
  };

  export let item: Item;

  let classes =
    'cursor-pointer inline-block text-footnote block underline underline-offset-4 bg-accent1-default/15 text-accent1-default transition-colors hover:bg-accent1-default/25 focus:bg-accent1-default/25';

  let truncateUrl = (url: string) => {
    let textWithoutPrefix = url.replace(/^https?:\/\//, '');
    let domain = textWithoutPrefix.split('/')[0];
    let path = textWithoutPrefix.slice(domain.length + 1).length
      ? textWithoutPrefix.slice(domain.length + 1)
      : '';

    let truncatedUrl =
      path.length > 8
        ? domain + '/' + textWithoutPrefix.slice(domain.length + 1, domain.length + 1 + 8) + '...'
        : textWithoutPrefix;
    return truncatedUrl;
  };

  let loading = false;
  let loadOgData = async (url: string) => {
    if (isBrowser) {
      loading = true;
      const ogData = await fetch(`/api/link?url=${url}`).then((res) => res.json());
      loading = false;
      return ogData;
    }
  };

  $: truncated = truncateUrl(item?.data?.url);
  $: isHoldexLink = regExp.holdexLink.test(item?.data?.url);

  let promise = loadOgData(item?.data?.url);

  const richLinkClicked = (data) => {
    if (!isHoldexLink) {
      window.open(item.data?.url, '_blank');
    }

    if (isHoldexLink) {
      goto(item.data?.url);
    }
  };
</script>

<span
  id="link"
  class="cursor-pointer flex bg-l2 rounded-xl w-full items-center h-24 border border-l4"
  on:click={richLinkClicked}
  on:keydown={richLinkClicked}
>
  {#await promise}
    <div class="h-full flex items-center">
      <div
        class="w-full image-holder-skeleton h-full rounded-xl bg-contain bg-no-repeat bg-center animation animate"
      />
      <section class="p-4 flex flex-col text-footnote justify-between gap-1 w-full overflow-hidden">
        <div class="animation animate h-4 skeleton-desc" />
        <div class="animation animate h-4" />
        <div>
          <span class={classes}>
            {truncated}
            {#if !isHoldexLink}
              <Icon icon={ArrowTopRightOnSquare} width={16} height={16} colorInherit />
            {/if}
          </span>
        </div>
      </section>
    </div>
  {:then ogdata}
    <section class="flex items-center h-24">
      {#if ogdata.image}
        <div
          class="image-holder rounded-xl bg-contain bg-no-repeat bg-center"
          style={`background-size:cover; background-position: center;
            background-repeat: no-repeat; background-image: url(${ogdata?.image[0]?.url});`}
        />
      {:else}
        <div
          class="w-[40px] h-[40px] bg-l3 ml-4 rounded-full flex items-center justify-center p-2 text-t3"
        >
          <Icon icon={Link} width={32} height={32} />
        </div>
      {/if}
    </section>

    <div class="p-4 flex flex-col text-footnote justify-between gap-1 w-full overflow-hidden">
      <div class="font-semibold">{ogdata.name || ogdata.title}</div>
      <div class="text-t3 text-ellipsis truncate">{ogdata.desc}</div>
      <div>
        <a
          title={item?.data?.title || ''}
          href={item?.data?.url}
          target={isHoldexLink ? '_self' : '_blank'}
          class={classes}
          rel="noreferrer"
        >
          {truncated}

          {#if !isHoldexLink}
            <Icon icon={ArrowTopRightOnSquare} width={16} height={16} colorInherit />
          {/if}
        </a>
      </div>
    </div>
  {/await}
</span>

<style lang="sass">

  .image-holder
    @apply h-[88px] w-[128px] ml-[3px]
  
  .image-holder-skeleton 
    @apply h-[88px] w-[220px]
  
  .skeleton-desc
    @apply w-[200px]

  .animation
    @apply bg-gradient-to-r from-l4 to-transparent bg-[400%_100%]

  .animate
    background-size: 400%
    -webkit-animation: loading 8s ease infinite
    -moz-animation: loading 8s ease infinite
    animation: loading 8s ease infinite


  @keyframes loading
    0%
      background-position: 200% 0
    100%
      background-position: -200% 0
</style>
