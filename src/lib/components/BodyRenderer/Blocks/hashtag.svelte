<script lang="ts">
  type Item = {
    type: string;
    text: string;
    href: string;
    title?: string;
  };

  export let item: Item;
  export let link: string | undefined = undefined;

  let classes =
    'relative inline-block underline underline-offset-4 bg-accent1-default/15 text-accent1-default  transition-colors hover:bg-accent1-default/25 focus:bg-accent1-default/25';

  $: text = item.text || item.href;
</script>

{' '}
{#if link}
  <a title={item.title ? item.title : ''} href={link} class={classes} rel="noreferrer">
    <slot {text} />
  </a>
{:else}
  <span title={item.title ? item.title : ''} class={classes}>
    <slot {text} />
  </span>
{/if}
