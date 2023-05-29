<script>
	import TweetHeader from './TweetHeader.svelte';
	import TweetInfo from './TweetInfo.svelte';
	import TweetAction from './TweetAction.svelte';
	import { getContext } from 'svelte';

	const { data, className } = $$props;

	let theme = getContext('theme');
</script>

<div
	class="tweet overflow-hidden rounded-[5px] hover:transition-[border-color] duration-[0.3s] ease-[ease-in-out] {className} {$theme}"
>
	<blockquote class="relative pt-5 pb-2.5 px-5">
		<TweetHeader tweet={data} />
		<slot />
		<TweetInfo tweet={data} />
	</blockquote>
	<TweetAction tweet={data} />
</div>

<style lang="sass">
    @import "../../common"

    .tweet
        color: map-get($light, tweet-font-color)
        font: $tweet-font
        background: map-get($light, tweet-bg-color)
        border: map-get($light, tweet-border)
        margin: $container-margin

        &:hover
            border: map-get($light, tweet-border-hover)
            

    .dark
        color: map-get($dark, tweet-font-color)
        background: map-get($dark, tweet-bg-color)
        border: map-get($dark, tweet-border)

        &:hover
            border: map-get($dark, tweet-border-hover)


    .tweet :global(.icon)
        display: inline-block
        height: 1.25em
</style>
