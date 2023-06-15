<script lang="ts" context="module">
	type Ticker = {
		id: string;
		price: number;
		change: number;
		timestamp: number;
	};

	let loaded: Ticker[] = [];
</script>

<script lang="ts">
	import { formatNumber } from '$components/NumbersManager';
	import Popover from '$components/Popover/index.svelte';

	type Item = {
		type: string;
		text: string;
	};

	export let item: Item;

	const REFETCH_DELAY = 1000 * 60 * 5;

	let change = 0.1;
	let price = 1000;
	let loading = false;
	let loadedTicker: Ticker | undefined = loaded.find(
		(ticker) => ticker.id === item.text.toLowerCase()
	);

	const fetchPrice = async () => {
		loadedTicker = loaded.find((ticker) => ticker.id === item.text.toLowerCase());
		if (loadedTicker && loadedTicker.timestamp > Date.now() - REFETCH_DELAY) {
			price = loadedTicker.price;
			change = loadedTicker.change;
			return;
		}
		loading = true;

		//TODO: replace with real API call and update price & change
		await new Promise((resolve) => setTimeout(resolve, 1000));

		loading = false;
		if (loadedTicker) {
			loadedTicker.price = price;
			loadedTicker.change = change;
			loadedTicker.timestamp = Date.now();
			loaded = [...loaded];
		} else {
			loaded = [
				...loaded,
				{
					id: item.text.toLowerCase(),
					price,
					change,
					timestamp: Date.now(),
				},
			];
		}
	};
</script>

<span
	class="underline-offset-4 text-paragraph-l xs:text-paragraph-s text-accent1-default underline decoration-dashed inline-block"
>
	${item.text}
	<Popover on:show={fetchPrice}>
		<p class="whitespace-nowrap">
			${item.text}:
			<span class="{loading ? 'blur-sm' : 'blur-none'} transition-all">
				{formatNumber(price, '$0,0.00')}
			</span>
		</p>
		<p class="whitespace-nowrap">
			24h:
			<span
				class="
                    {change > 0 ? 'text-rating-a' : change < 0 ? 'text-rating-c' : 'text-rating-b'}
                    {loading ? 'blur-sm' : 'blur-none'} 
                    transition-all
                "
			>
				{formatNumber(change, '0.00%')}
			</span>
		</p>
	</Popover>
</span>
