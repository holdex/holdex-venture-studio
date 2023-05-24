<script>
    import PermaLink from "./permalink.svelte";
</script>

<h1 class="heading">
    <PermaLink id={$$props.data.id}>
        <slot />
    </PermaLink>
</h1>

<style>
    h1 {
        font-size: 2rem;
    }
</style>
