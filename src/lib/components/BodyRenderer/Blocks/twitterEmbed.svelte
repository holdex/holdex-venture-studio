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
				encodeURIComponent(
					`https://old.holdex.io/api/tweets.json?id=https://twitter.com/Variety/status/${id}`
				);
			return fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			})
				.then(async (res: any) => {
					if (res.ok) {
						let data = await res.json();
						console.log("🚀 ~ file: twitterEmbed.svelte:30 ~ .then ~ data:", data.data);
                        return data.data;
					}
				})
				.catch((error: any) => {
					console.log('err', error);
					return [];
				});
		}
	};

	let promise = loadTweet(id);
</script>

{#await promise}
	<Tweet theme={$theme} skeleton />
{:then ast}
	<Tweet theme={$theme} {ast} />
{/await}
