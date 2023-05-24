<script>
    import { getContext } from "svelte";
    const { href } = $$props;

    let theme = getContext("theme");
</script>

<a
    class="exclude {$theme}"
    {href}
    target="_blank"
    rel="noopener noreferrer"
    title={href}
>
    <b><slot /></b>
</a>

<style lang="sass">
    @import "../../common"

    a
        display: inline-block
        color: map-get($light, link-color)
        text-decoration: none
        
        &:hover
            text-decoration: underline

    .dark
        color: map-get($dark, link-color)
</style>
