<script lang="ts">
  import { regExp } from '$components/BodyParser/utils';
  import { ArrowTopRightOnSquare } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { getContext } from 'svelte';

  type Item = {
    type: string;
    url:string;
    embed: string;
    title?: string;
  };

  export let item: Item;

  let parentWrapper = getContext('wrapper');

  $: classes =
    'underline  underline-offset-4 bg-accent1-default/15 text-accent1-default transition-colors hover:bg-accent1-default/25 focus:bg-accent1-default/25';

  switch (item.type) {
    case 'link':
      break;
    default:
      classes += ' text-paragraph-l';
      break;
  }

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

  $: text = item.url;
  $: truncated = text.includes('http') ? truncateUrl(text) : text;
  $: isHoldexLink = regExp.holdexLink.test(item.url);
</script>

{' '}
  <span
  title={item.title ? item.title : ''}
  class={classes}
>
  <slot text={truncated} />
  {#if !isHoldexLink}
    <Icon icon={ArrowTopRightOnSquare} width={16} height={16} colorInherit />
  {/if}
</span>

<style lang="sass">
  a :global(*)
    @apply text-inherit
</style>
