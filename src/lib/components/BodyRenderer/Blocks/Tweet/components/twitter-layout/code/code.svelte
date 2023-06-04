<script>
	import { getContext } from 'svelte';

	const { className, ...rest } = $$props;

	let theme = getContext('theme');
</script>

<code class="mono text-sm {className} {$theme}" {...rest}>
	<slot />
</code>

<style lang="sass">
    @import "../../../../../../../styles/theme"

    code.inline
        @apply text-tw-inline-code-color whitespace-pre-wrap

    .dark.inline
        @apply text-tw-inline-code-color

</style>
