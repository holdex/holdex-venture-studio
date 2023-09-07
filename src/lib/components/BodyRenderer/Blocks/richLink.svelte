<script lang="ts">
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
    'inline-block text-footnote block underline underline-offset-4 bg-accent1-default/15 text-accent1-default transition-colors hover:bg-accent1-default/25 focus:bg-accent1-default/25';

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

  let loadOgData = async (url: string) => {
    if (isBrowser) {
      return fetch(`/api/link?url=${url}`).then((res) => res.json());
    }
  };

  let truncateOgDesc = (desc: string) => {
    return desc.slice(0, 50);
  };

  $: truncated = truncateUrl(item?.data?.url);
  $: isHoldexLink = regExp.holdexLink.test(item?.data?.url);
</script>

{#await loadOgData(item?.data?.url) then ogdata}
  <div class="flex border border-l4 bg-l2 rounded-xl w-full items-center p-1 h-24">
    <div class="h-full">
      {#if ogdata.image[0].url}
        <img class="w-32 h-full rounded-xl" src={ogdata?.image[0]?.url} alt={ogdata.title} />
      {:else}
        <Icon icon={Link} width={32} height={32} colorInherit />
      {/if}
    </div>

    <div class="p-4 flex flex-col text-footnote justify-between gap-1">
      <div class="font-semibold">{ogdata.name || ogdata.title}</div>
      <div class="text-t3">{truncateOgDesc(ogdata.desc)}...</div>
      <div>
        <a
          title={item.title ? item.title : ''}
          href={item.href}
          class={classes}
          target={isHoldexLink ? '_self' : '_blank'}
          rel="noreferrer"
        >
          <slot>
            {truncated}
          </slot>
          {#if !isHoldexLink}
            <Icon icon={ArrowTopRightOnSquare} width={16} height={16} colorInherit />
          {/if}
        </a>
      </div>
    </div>
  </div>
{/await}
