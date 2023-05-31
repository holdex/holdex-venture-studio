<script>
	const { className, ...rest } = $$props;
</script>

<ol class={'p-l4' + className} {...rest}>
	<slot />
</ol>

<style lang="sass">
    @import "../../common"
    
    ol
        margin: $text-margin
</style>
