<script lang="ts">
	import { getContext } from 'svelte';
	import Tweet from './Tweet/tweet.svelte';
	import type { Writable } from 'svelte/store';
	import { browser } from '$app/environment';

	export let source: string;

	let theme: Writable<string> = getContext('currentTheme');

	let id = source.split('/').pop();

	let loadTweet = async (tweetId: string | undefined) => {
		//@ts-ignore
		if (browser) {
			const url =
				'https://corsproxy.io/?' +
				encodeURIComponent(`https://old.holdex.io/api/tweets.json?id=${id}`);
				
			try {
				const response = await fetch(url, { method: 'GET' });

				if (response.ok) {
					let data = await response.json();
					return data.data;
				}
			} catch (error) {
				console.log('err', error);
				return [];
			}
		}
	};

	let promise = loadTweet(id);
</script>

{#await promise}
	<Tweet theme={$theme} skeleton />
{:then ast}
	<Tweet theme={$theme} {ast} />
{/await}
