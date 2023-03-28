<script lang="ts">
	import { escape } from '$components/BodyParser/escaper';
	import { Switch, Case } from '$components/Switch';
	import TextWrapper from './Blocks/textWrapper.svelte';
	import Image from './Blocks/image.svelte';

	type Item = {
		type: string;
		text: string;
		href?: string;
	};

	export let item: Item;
</script>

<template lang="pug" src="./inline.pug">

</template>
