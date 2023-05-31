<script>
	import { getContext } from 'svelte';

	const { className, ...rest } = $$props;

	let theme = getContext('theme');
</script>

<pre class="{className} {$theme}" {...rest}><slot /></pre>

<style lang="sass">
    @import "../../common"
    
    pre
        color: map-get($tw-light, code-color)
        background: map-get($tw-light, code-bg-color)
        padding: 1.25rem
        margin: $container-margin
        white-space: pre
        overflow: auto
        -webkit-overflow-scrolling: touch

    .dark
        color: map-get($tw-dark, code-color)
        background: map-get($tw-dark, code-bg-color)
</style>
