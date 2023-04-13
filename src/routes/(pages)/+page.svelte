<script lang="ts">
	import MetaTags from '$components/MetaTags/index.svelte';
	import Parser, { type Message } from '$components/BodyParser';
	import BodyRenderer from '$components/BodyRenderer/index.svelte';
	import TextHighlight from '$components/TextHighlight/index.svelte';
	import { signature } from '$components/Icons';
	import Chart from '$components/Chart/index.svelte';

	import { routes } from '$lib/config';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ store } = data);
	$: ({ data: storeData } = $store);
	$: message = Parser.parse(storeData?.message as Message);

	let handleChartData = async () => {
		await new Promise((res, rej) => setTimeout(res, 5000));
		return data
			.fetch(`api/market-info?url=https://www.coingecko.com/en/coins/clearpool`)
			.then((res) => res.json());
	};
</script>

<MetaTags
	title={message.title}
	description={message.subtitle}
	path={routes.index}
	imagePath="/og/index.png"
/>

<template lang="pug" src="./template.pug">

</template>
