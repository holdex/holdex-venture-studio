<script lang="ts">
  type Item = {
    type: string;
    text: string;
    href: string;
    title?: string;
  };

  export let item: Item;
  export let link: string | undefined = undefined;

  $: text = item.text || item.href;
</script>

{' '}
{#if link}
  <a title={item.title ? item.title : ''} href={link} rel="noreferrer">
    <slot {text} />
  </a>
{:else}
  <span
    title={item.title ? item.title : ''}
    class="relative inline-block text-accent1-default transition-colors"
  >
    <slot {text} />
  </span>
{/if}
