<script>
    import PermaLink from "./permalink.svelte";
</script>

<h5 class="heading">
    <PermaLink id={$$props.data.id}>
        <slot />
    </PermaLink>
</h5>

<style>
    h5 {
        font-size: 1rem;
    }
</style>
