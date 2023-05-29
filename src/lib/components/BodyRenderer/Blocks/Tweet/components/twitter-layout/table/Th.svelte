<script>
	import { getContext } from 'svelte';

	let theme = getContext('theme');
	const { className, ...rest } = $$props;
</script>

<th class="font-semibold px-3.5 py-2 {className} {$theme}" {...rest}>
	<slot />
</th>

<style lang="sass">
    @import "../../common"

    th
        border: 1px solid map-get($light, accents-2)

    .dark
        border-color: map-get($dark, accents-2)

</style>
