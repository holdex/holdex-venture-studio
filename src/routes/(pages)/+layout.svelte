<script lang="ts">
	const pageTheme = 'dark';
</script>

<div class="app-container overflow-x-hidden" data-theme={pageTheme}>
	<main>
		<slot />
	</main>
</div>

<svelte:head>
	<style lang="scss" src="./layout.scss"></style>
</svelte:head>
