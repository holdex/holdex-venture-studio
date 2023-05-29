<script>
	const { className, ...rest } = $$props;
</script>

<div class="flex table-container justify-center w-full">
	<table class={'block overflow-auto border-collapse' + className} {...rest}>
		<slot />
	</table>
</div>

<style lang="sass">
    @import "../../common"

    .table-container
        margin: $container-margin
</style>
