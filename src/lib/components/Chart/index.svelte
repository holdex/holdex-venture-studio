<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import { isBrowser } from '$lib/config';
  import { generateOptions } from './options';
  import { formatNumber } from '$components/NumbersManager';

  import type { ApexOptions } from 'apexcharts';

  export let prices: any[] | null = null;
  export let info: any | undefined = undefined;

  let el: HTMLDivElement;
  let chart: any;

  let initComponent = async (options: ApexOptions) => {
    let module = await import('apexcharts');
    chart = new module.default(el, options);
    await chart.render();
  };

  let bindPriceChangeClass = (price: string) => {
    if (Number(price) > 0) {
      return 'text-rating-a';
    } else {
      return 'text-rating-c';
    }
  };

  $: isLoading = !Array.isArray(prices);
  $: options = generateOptions(prices, isLoading);

  $: {
    if (isBrowser && prices) {
      initComponent(options);
    }
  }

  $: chart && chart.updateOptions(options);
</script>

<template lang="pug" src="./template.pug">
</template>

<style lang="sass" src="./style.sass">
	.chart-graph :global(.apexcharts-tooltip)
		@apply flex flex-col bg-l4 gap-1 p-1.75 border border-solid border-l6 rounded-2lg shadow-tag
</style>
