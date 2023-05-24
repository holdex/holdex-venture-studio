<script>
    import PermaLink from "./permalink.svelte";
</script>

<h4 class="heading">
    <PermaLink id={$$props.data.id}>
        <slot />
    </PermaLink>
</h4>

<style>
    h4 {
        font-size: 1.25rem;
    }
</style>
