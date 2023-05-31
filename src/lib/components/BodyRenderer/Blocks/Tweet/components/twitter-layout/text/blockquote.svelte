<script>
	import { getContext } from 'svelte';

	const { className, ...rest } = $$props;

	let theme = getContext('theme');
</script>

<blockquote class="px-5 py-0 {className} {$theme}" {...rest}>
	<slot />
</blockquote>

<style lang="sass">
    @import "../../common"

    blockquote
        background: map-get($tw-light,accents-1)
        color: map-get($tw-light, accents-5)
        border: 1px solid map-get($tw-light, accents-2)
        margin: $container-margin
        

    .dark
        background: map-get($tw-dark,accents-1)
        color: map-get($tw-dark, accents-5)
        border-color: map-get($tw-dark, accents-2)
</style>
