<script>
	import { getContext } from 'svelte';

	const { className, ...rest } = $$props;

	let theme = getContext('theme');
</script>

<ul class="list-none pl-4 {className} {$theme}" {...rest}>
	<slot />
</ul>

<style lang="sass">
    @import "../../common"

    ul
        margin: $text-margin
    
    ul :global(li:before)
        content: "-"
        color: map-get($tw-light, 'accents-3')
        position: absolute
        margin-left: -1rem
        
    .dark :global(li:before)
        color: map-get($tw-dark, 'accents-3')
</style>
