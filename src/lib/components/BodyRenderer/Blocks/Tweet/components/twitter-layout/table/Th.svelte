<script>
    import { getContext } from "svelte";

    let theme = getContext("theme");
    const { className, ...rest } = $$props;
</script>

<th class="{className} {$theme}" {...rest}>
    <slot />
</th>

<style lang="sass">
    @import "../../common"

    th
        font-weight: 600
        padding: 0.5rem 0.875rem
        border: 1px solid map-get($light, accents-2)

    .dark
        border-color: map-get($dark, accents-2)

</style>
