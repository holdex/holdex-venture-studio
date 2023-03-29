<script lang="ts">
	import Parser from '$components/BodyParser';
	import BodyRenderer from '$components/BodyRenderer/index.svelte';
	import type { Community } from '$lib/types/api';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ store } = data);
	$: ({ data: storeData } = $store);
	$: message = Parser.parseFromCategory(storeData?.community as Community);
</script>

<template lang="pug" src="./template.pug">

</template>
