<script>
	import { getContext } from 'svelte';

	const { className, ...rest } = $$props;

	let theme = getContext('theme');
</script>

<pre class="mx-0 my-6 {className} {$theme}" {...rest}><slot /></pre>

<style lang="sass">
    @import "../../../../../../../styles/theme"
    
    pre
        color: map-get($tw-light, code-color)
        background: map-get($tw-light, code-bg-color)
        @apply whitespace-pre overflow-auto p-5
        -webkit-overflow-scrolling: touch
    .dark
        color: map-get($tw-dark, code-color)
        background: map-get($tw-dark, code-bg-color)
</style>
