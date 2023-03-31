<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import Parser from '$components/BodyParser';
	import BodyRenderer from '$components/BodyRenderer/index.svelte';
	import Icon from '$components/Icons/index.svelte';
	import { BarsArrowDown, BarsArrowUp } from '$components/Icons';
	import { scrollToElement } from '$lib/utils';
	import type { Community } from '$lib/types/api';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ store } = data);
	$: ({ data: storeData } = $store);
	$: message = Parser.parseFromCategory(storeData?.community as Community);

	let tocOpen: boolean = false;

	let renderTocPadding = (level: 'h2' | 'h3' | 'h4') => {
		switch (level) {
			case 'h3':
				return 'pl-8';
			case 'h4':
				return 'pl-16';
			default:
				return '';
		}
	};

	let getActiveToc = (url: URL, item: string) => {
		const tag = url.hash;
		return tag && tag.slice(1) === item ? '!text-t1' : '';
	};

	let toggleToc = () => {
		tocOpen = !tocOpen;
	};

	let gotoTag = (url: URL, item: string) => {
		// const currentUrl = url;
		// currentUrl.hash = item;
		tocOpen = false;
		scrollToElement(item, 64);
		// return goto(currentUrl);
	};
</script>

<template lang="pug" src="./template.pug">

</template>
