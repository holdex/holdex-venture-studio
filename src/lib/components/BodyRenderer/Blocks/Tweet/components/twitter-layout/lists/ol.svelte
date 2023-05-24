<script>
    const { className, ...rest } = $$props;
</script>

<ol class={className} {...rest}>
    <slot />
</ol>

<style lang="sass">
    @import "../../common"
    
    ol
        margin: $text-margin
        padding-left: 1rem
</style>
