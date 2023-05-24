<script>
    import { getContext } from "svelte";

    export let style = "";

    let theme = getContext("theme");
</script>

<span class="skeleton {$theme}" {style}>
    <slot />
</span>

<style lang="sass">
    @import "../../common"

    .skeleton
        display: block
        width: 100%
        border-radius: 5px
        background: linear-gradient(270deg,map-get($light, accents-1),map-get($light, accents-2),map-get($light, accents-2),map-get($light, accents-1))
        background-size: 400% 100%
        animation: loading 8s ease-in-out infinite

    .dark
        background: linear-gradient(90deg,map-get($dark, accents-1),map-get($dark, accents-2),map-get($dark, accents-2),map-get($dark, accents-1))

    @keyframes loading 
        0%
            background-position: 200% 0
        100%
            background-position: -200% 0
</style>
