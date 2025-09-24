<script lang="ts">
  import { regExp } from '$components/BodyParser/utils';
  import { goto } from '$app/navigation';

  type Item = {
    text: string;
    href: string;
    type?: string;
    title?: string;
    iconSize?: number;
  };

  export let item: Item;

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

  function normalizeHref(href: string) {
    if (typeof window === 'undefined') return href;

    try {
      const currentHost = window.location.host;
      const url = new URL(href, window.location.origin);
      if (url.host === currentHost) {
        return url.pathname + url.search + url.hash;
      }

      return href;
    } catch (e) {
      // For relative links like "/about", just return as-is
      return href;
    }
  }

  $: text = item.text || item.href;
  $: href = normalizeHref(item.href);
  $: truncated = text.includes('http') ? truncateUrl(text) : text;
  $: isHoldexLink = regExp.holdexLink.test(item.href);
  $: isInternalLink = regExp.internalLink.test(item.href || '');

  const handleClick = (e: MouseEvent, href: string) => {
    if (isHoldexLink || isInternalLink) {
      e.preventDefault();
      goto(href);
    }
  };
</script>

{' '}
<a
  title={item.title ? item.title : ''}
  {href}
  target={isHoldexLink || isInternalLink ? '_self' : '_blank'}
  rel="noreferrer"
  on:click={(e) => handleClick(e, item.href)}
>
  <slot text={truncated} />
</a>

<style lang="sass">
  a :global(*)
    @apply text-inherit
</style>