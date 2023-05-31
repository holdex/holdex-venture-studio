<script>
	import { getContext } from 'svelte';

	const { className, ...rest } = $$props;

	let theme = getContext('theme');
</script>

<hr class="border-0 {className} {$theme}" {...rest} />

<style lang="sass">
    @import "../../common"

    hr
        
        border-top: 1px solid map-get($tw-light, accents-2)
        margin: $text-margin

    .dark
        border-top-color: map-get($tw-dark, accents-2)
</style>
