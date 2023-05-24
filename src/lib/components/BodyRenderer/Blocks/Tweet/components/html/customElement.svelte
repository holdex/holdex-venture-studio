<script>
    import { onMount } from "svelte";
    export let tag;
    export let className = undefined;

    let component = null;

    onMount(async () => {
        /* @vite-ignore */
        let module = await import(/* @vite-ignore */ `svelte-elements/src/${tag}.svelte`);
        component = module.default;
    });
</script>

<svelte:component this={component} class={className}>
    <slot />
</svelte:component>
