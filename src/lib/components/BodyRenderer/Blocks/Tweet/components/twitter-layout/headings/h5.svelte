<script>
  import PermaLink from './permalink.svelte';
</script>

<h5>
  <PermaLink id={$$props.data.id}>
    <slot />
  </PermaLink>
</h5>
