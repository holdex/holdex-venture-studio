<script>
	import TweetHeader from './TweetHeader.svelte';
	import TweetInfo from './TweetInfo.svelte';
	import TweetAction from './TweetAction.svelte';
	import { getContext } from 'svelte';

	const { data, className } = $$props;

	let theme = getContext('theme');
</script>

<div
	class="tweet mx-0 my-6 overflow-hidden rounded-[5px] hover:transition-[border-color] duration-[0.3s] ease-[ease-in-out] {className} {$theme}"
>
	<blockquote class="relative pt-5 pb-2.5 px-5">
		<TweetHeader tweet={data} />
		<slot />
		<TweetInfo tweet={data} />
	</blockquote>
	<TweetAction tweet={data} />
</div>

<style lang="sass">

    @import "../../../../../../../styles/theme"


    .tweet
        color: map-get($tw-light, tweet-font-color)
        background: map-get($tw-light, tweet-bg-color)
        border: map-get($tw-light, tweet-border)
        font: normal normal 18px/1.4 Helvetica, Roboto, "Segoe UI", Calibri,
    sans-serif

        &:hover
            border: map-get($tw-light, tweet-border-hover)
            

    .dark
        color: map-get($tw-dark, tweet-font-color)
        background: map-get($tw-dark, tweet-bg-color)
        border: map-get($tw-dark, tweet-border)

        &:hover
            border: map-get($tw-dark, tweet-border-hover)


    .tweet :global(.icon)
        @apply inline-block h-[1.25em]
</style>
