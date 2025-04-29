<script>
  import PermaLink from './permalink.svelte';
</script>

<h3 class="heading">
  <PermaLink id={$$props.data.id}>
    <slot />
  </PermaLink>
</h3>
