<script>
	import { getContext } from 'svelte';
	const { href } = $$props;

	let theme = getContext('theme');
</script>

<a
	class="inline-block no-underline hover:underline exclude {$theme}"
	{href}
	target="_blank"
	rel="noopener noreferrer"
	title={href}
>
	<b><slot /></b>
</a>

<style lang="sass">
	@import "../../../../../../../styles/theme"

a
	color: map-get($tw-light, link-color)

.dark
	color: map-get($tw-dark, link-color)
</style>
