<script lang="ts">
	/* eslint-disable @typescript-eslint/no-unused-vars */
	import Item from '../item.svelte'

	export let cell: any;
</script>

<Item item={cell} isTableCell />
