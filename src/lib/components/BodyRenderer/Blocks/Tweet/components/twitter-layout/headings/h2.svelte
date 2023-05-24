<script>
    import PermaLink from "./permalink.svelte";
</script>

<h2 class="heading">
    <PermaLink id={$$props.data.id}>
        <slot />
    </PermaLink>
</h2>

<style>
    h2 {
        font-size: 1.75rem;
    }
</style>
