<script lang="ts">
	import { getContext } from 'svelte';
	import Tweet from './Tweet/tweet.svelte';
	import type { Writable } from 'svelte/store';
	import { browser } from '$app/environment';

	export let source: string;

	let theme: Writable<string> = getContext('currentTheme');

	let id = source.split('/').pop();

	let loadTweet = async (tweetId: string | undefined) => {
		return fetch(`/api/tweets?id=${tweetId}`).then((res) => res.json());
	};
</script>

{#await loadTweet(id)}
	<Tweet theme={$theme} skeleton />
{:then ast}
	<Tweet theme={$theme} {ast} />
{/await}
