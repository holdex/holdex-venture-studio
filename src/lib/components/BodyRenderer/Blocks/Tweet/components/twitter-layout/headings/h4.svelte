<script>
  import PermaLink from './permalink.svelte';
</script>

<h4 class="heading">
  <PermaLink id={$$props.data.id}>
    <slot />
  </PermaLink>
</h4>
