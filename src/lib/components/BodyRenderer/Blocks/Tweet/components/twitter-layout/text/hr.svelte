<script>
	import { getContext } from 'svelte';

	const { className, ...rest } = $$props;

	let theme = getContext('theme');
</script>

<hr class="border-0 mx-0 my-6 {className} {$theme}" {...rest} />

<style lang="sass">
    @import "../../../../../../../styles/theme"

    hr
        border-top: 1px solid map-get($tw-light, accents-2)

    .dark
        border-top-color: map-get($tw-dark, accents-2)
</style>
