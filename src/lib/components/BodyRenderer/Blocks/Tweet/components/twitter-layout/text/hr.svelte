<script>
    import { getContext } from "svelte";

    const { className, ...rest } = $$props;

    let theme = getContext("theme");
</script>

<hr class="{className} {$theme}" {...rest} />

<style lang="sass">
    @import "../../common"

    hr
        border: 0
        border-top: 1px solid map-get($light, accents-2)
        margin: $text-margin

    .dark
        border-top-color: map-get($dark, accents-2)
</style>
