<script lang="ts">
	import Button from '$components/Button/index.svelte';

	type Item = {
		type: string;
		url: string;
		id: string;
	};
	export let item: Item;
</script>

<template lang="pug">
    .btn-wrapper(class="flex flex-col items-start py-2")
        Button(
        label="Apply Now" 
            size="large" 
            data-tally-open="{item.id}" 
        )
</template>

<svelte:head>
	<script async src="https://tally.so/widgets/embed.js"></script>
</svelte:head>
