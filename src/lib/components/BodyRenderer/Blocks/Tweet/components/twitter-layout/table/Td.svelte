<script>
	import { getContext } from 'svelte';

	let theme = getContext('theme');

	const { className, ...rest } = $$props;
</script>

<td class="px-3.5 py-2 {className} {$theme}" {...rest}>
	<slot />
</td>

<style lang="sass">
    @import "../../common"

    td
        border: 1px solid map-get($light, accents-2)

    .dark
        border-color: map-get($dark, accents-2)

</style>
