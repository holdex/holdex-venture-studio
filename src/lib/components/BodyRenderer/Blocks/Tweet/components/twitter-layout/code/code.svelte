<script>
    import { getContext } from "svelte";

    const { className, ...rest } = $$props;

    let theme = getContext("theme");
</script>

<code class="{className} {$theme}" {...rest}>
    <slot />
</code>

<style lang="sass">
    @import "../../common"

    code
        font-size: 14px
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif

    code.inline
        color: map-get($light, 'inline-code-color')
        font-size: 1rem
        white-space: pre-wrap

    .dark.inline
        color: map-get($dark, 'inline-code-color')
</style>
