<script>
	import { getContext } from 'svelte';

	export let style = '';

	let theme = getContext('theme');
</script>

<span
	class="block
	bg-gradient-to-r
	from-tw-accents-1
	w-full
	bg-[400%_100%]
	animate-[loading_8s_ease-in-out_infinite]
	rounded-[5px]
	{$theme}"
	{style}
>
	<!-- TODO: 
	As I understand the existing placeholder and animation 
	ware out of shape so upgraded to the current design 
	compliant look for the skeleton.
-->
	<slot />
</span>

<style lang="sass">
    @keyframes loading 
        0%
            background-position: 200% 0
        100%
            background-position: -200% 0
</style>
