<script>
	import { getContext } from 'svelte';

	export let style = '';

	let theme = getContext('theme');
</script>

<span
	class="skeleton block w-full bg-[400%_100%] animate-[loading_8s_ease-in-out_infinite] rounded-[5px] {$theme}"
	{style}
>
	<slot />
</span>

<style lang="sass">
    @import "../../common"

    .skeleton
        background: linear-gradient(270deg,map-get($light, accents-1),map-get($light, accents-2),map-get($light, accents-2),map-get($light, accents-1))

    .dark
        background: linear-gradient(90deg,map-get($dark, accents-1),map-get($dark, accents-2),map-get($dark, accents-2),map-get($dark, accents-1))

    @keyframes loading 
        0%
            background-position: 200% 0
        100%
            background-position: -200% 0
</style>
