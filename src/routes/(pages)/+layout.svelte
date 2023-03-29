<script lang="ts">
	import { page } from '$app/stores';

	import { socialIcons } from '$components/Icons';
	import { regExp } from '$components/BodyParser/utils';

	const pageTheme = 'dark';

	$: path = $page.url.pathname;
	$: form = $page.form;
	let isActive = (currentUrl: string, path: string, deepEqual: boolean = false) => {
		if (deepEqual) {
			return currentUrl === path;
		}
		return currentUrl.startsWith(path);
	};

	let handleClick = () => {
		return document.querySelector('#contact-form')?.scrollIntoView({
			behavior: 'smooth'
		});
	};

	let scrollY: any;
</script>

<template lang="pug" src="./layout.pug">

</template>

<svelte:window bind:scrollY />

<svelte:head>
	<style lang="scss" src="./layout.scss"></style>
</svelte:head>
