<script>
    const { className, ...rest } = $$props;
</script>

<div class="table-container">
    <table class={className} {...rest}>
        <slot />
    </table>
</div>

<style lang="sass">
    @import "../../common"

    .table-container
        display: flex
        justify-content: center
        width: 100%
        margin: $container-margin
    
    table 
        display: block
        overflow: auto
        border-collapse: collapse
</style>
