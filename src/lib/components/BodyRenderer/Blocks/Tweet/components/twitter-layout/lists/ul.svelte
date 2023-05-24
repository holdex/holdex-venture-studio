<script>
    import { getContext } from "svelte";

    const { className, ...rest } = $$props;

    let theme = getContext("theme");
</script>

<ul class="{className} {$theme}" {...rest}>
    <slot />
</ul>

<style lang="sass">
    @import "../../common"

    ul
        margin: $text-margin
        list-style-type: none
        padding-left: 1rem
    
    ul :global(li:before)
        content: "-"
        color: map-get($light, 'accents-3')
        position: absolute
        margin-left: -1rem
        
    .dark :global(li:before)
        color: map-get($dark, 'accents-3')
</style>
