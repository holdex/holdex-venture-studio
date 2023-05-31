<script>
	import { getContext } from 'svelte';

	const { className, ...rest } = $$props;

	let theme = getContext('theme');
</script>

<ul class="list-none pl-4 text-[1.25rem_0] {className} {$theme}" {...rest}>
	<slot />
</ul>

<style lang="sass">
    @import "../../../../../../../styles/theme"

    ul :global(li:before)
        color: map-get($tw-light, 'accents-3')
        @apply content-["-"] absolute ml-[-1rem]
                
    .dark :global(li:before)
        color: map-get($tw-dark, 'accents-3')
</style>
