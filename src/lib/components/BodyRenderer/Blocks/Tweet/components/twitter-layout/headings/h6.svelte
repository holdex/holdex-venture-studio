<script>
  import PermaLink from './permalink.svelte';
</script>

<h6 class="heading">
  <PermaLink id={$$props.data.id}>
    <slot />
  </PermaLink>
</h6>
