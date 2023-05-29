<script>
	const { className, ...rest } = $$props;
</script>

<li class={'pl-0' + className} {...rest}>
	<slot />
</li>

<style lang="sass">
    @import "../../common"

    li
        margin: $li-margin
</style>
