<script lang="ts">
	import Parser from '$components/BodyParser';
	import type {  Message } from '$lib/types/api';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ store } = data);
	$: ({ data: storeData } = $store);
	$: community = storeData?.community;


	let parseMessage = (message: Message, category: string) => {
		return Parser.parseViaCategory(message, category)
	}
</script>

<template lang="pug" src="./template.pug">

</template>
