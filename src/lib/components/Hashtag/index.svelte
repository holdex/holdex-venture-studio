<script lang="ts">
	export let element: string;

	export let tag: string;
	export let onClick: () => void;

	export let hoverable: boolean = false;

	let className: string = '';
	export { className as class };

	$: hoverableClass = hoverable ? 'cursor-pointer transition-all hover:bg-l3 hover:text-t1' : '';
</script>

<svelte:element
	this={element}
	class="inline-flex relative justify-center rounded-xl bg-l2 text-cta text-t3 shadow-tag px-3 before:content-[''] before:absolute before:border before:border-solid before:border-l4 before:w-full before:h-full before:rounded-xl before:left-0 before:top-0 {className}"
	on:click={onClick}
>
	{tag}
</svelte:element>
