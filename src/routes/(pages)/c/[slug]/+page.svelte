<script lang="ts">
	import type { Community } from '$lib/types/api';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ store } = data);
	$: ({ data: storeData } = $store);
	$: community = storeData?.community;
</script>

<template lang="pug" src="./template.pug">

</template>
