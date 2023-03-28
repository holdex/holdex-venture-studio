<script lang="ts">
	export let item;
	export let index: number;

	const { loading, src, alt, title } = item;
</script>

<img
	fetchpriority={index < 4 ? 'high' : 'auto'}
	class="object-contain border border-solid border-l4 rounded-2xl max-h-[500px]"
	{src}
	{alt}
	{title}
	{loading}
/>
