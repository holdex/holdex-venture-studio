<script>
    const { className, ...rest } = $$props;
</script>

<li class={className} {...rest}>
    <slot />
</li>

<style lang="sass">
    @import "../../common"

    li
        padding-left: 0
        margin: $li-margin
</style>
