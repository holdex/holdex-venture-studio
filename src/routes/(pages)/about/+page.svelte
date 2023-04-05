<script lang="ts">
	import MetaTags from '$components/MetaTags/index.svelte';
	import Parser, { type Message } from '$components/BodyParser';
	import BodyRenderer from '$components/BodyRenderer/index.svelte';
	import { routes } from '$lib/config';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ store } = data);
	$: ({ data: storeData } = $store);
	$: message = Parser.parse(storeData?.message as Message);
</script>

<MetaTags title="About" description="" path={routes.about} imagePath="" />

<template lang="pug" src="./template.pug">

</template>
