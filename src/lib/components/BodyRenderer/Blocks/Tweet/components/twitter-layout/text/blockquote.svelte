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
        background: map-get($light,accents-1)
        color: map-get($light, accents-5)
        border: 1px solid map-get($light, accents-2)
        margin: $container-margin
        

    .dark
        background: map-get($dark,accents-1)
        color: map-get($dark, accents-5)
        border-color: map-get($dark, accents-2)
</style>
