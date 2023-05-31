<script>
	import { getContext } from 'svelte';

	import Skeleton from '../skeleton/index.svelte';

	export let simple = false;

	let theme = getContext('theme');
</script>

<div class="container mx-0 my-6 rounded-[5px] {$theme}">
	<div class="pt-5 pb-2.5 px-5">
		<Skeleton style="height: 2.25rem" />
		<Skeleton style="height: 7rem; margin: 1.25rem 0" />
		<Skeleton style="height: 1.25rem" />
	</div>
	{#if !simple}
		<div class="footer h-10 px-5 py-2.5 {$theme}">
			<Skeleton style="height: 1.25rem" />
		</div>
	{/if}
</div>

<style lang="sass">
    @import "../../../../../../../styles/theme"

    .container
        background: map-get($tw-light,tweet-bg-color)
        border: map-get($tw-light, tweet-border)

        &.dark
            background: map-get($tw-dark, tweet-bg-color)
            border: map-get($tw-dark, tweet-border)

    .footer
        border-top: map-get($tw-light, tweet-border)

        &.dark
            border-top: map-get($tw-dark, tweet-border)
</style>
