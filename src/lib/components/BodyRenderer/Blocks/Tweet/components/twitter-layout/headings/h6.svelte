<script>
    import PermaLink from "./permalink.svelte";
</script>

<h6 class="heading">
    <PermaLink id={$$props.data.id}>
        <slot />
    </PermaLink>
</h6>

<style>
    h6 {
        font-size: 0.875rem;
    }
</style>
