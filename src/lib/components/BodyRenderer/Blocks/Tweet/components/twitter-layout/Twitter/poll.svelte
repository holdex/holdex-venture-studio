<script>
	import { howFarFromNow } from '$components/DateManager';
	import { getContext } from 'svelte';

	const data = $$props.data;

	const votesCount = data.options.reduce((count, option) => count + option.votes, 0);
	const endsAt = new Date(data.endsAt);
	const now = new Date();

	$: optionWidth = (option) => Math.round((option.votes / votesCount) * 100) || 1;
	$: optionWidthLabel = (option) => Math.round((option.votes / votesCount) * 100) || 0;

	const theme = getContext('theme');
</script>

<div class="mx-4 my-6">
	<div
		class="@apply grid grid-cols-[max-content_14rem_max-content] items-center gap-4 overflow-auto;"
	>
		{#each data.options as option}
			<span class="label overflow-auto text-right whitespace-pre-wrap">{option.label}</span>
			<span class="chart h-full {$theme}" style="width: {optionWidth(option)}" />
			<span>{optionWidthLabel(option)}%</span>
		{/each}
	</div>
	<hr class="mt-4 mb-2 mx-0 border-0{$theme}" />
	<div class="footer flex text-sm {$theme}">
		<span class="grow">{votesCount} votes</span>
		<span>{now > endsAt ? 'Final results' : `${howFarFromNow(endsAt)} left`}</span>
	</div>
</div>

<style lang="sass">
    @import "../../../../../../../styles/theme"


    .label 
        word-wrap: break-word

    .chart
        background: map-get($tw-light, poll-bar-color)

        &.dark
            background: map-get($tw-dark, poll-bar-color)

    hr
        border-top: 1px solid map-get($tw-light, accents-2)

        &.dark
            border-top-color: map-get($tw-dark, accents-2)

    .footer
        color: map-get($tw-light, accents-4)

        &.dark
            color: map-get($tw-dark, accents-4)

    @media screen and (max-width: 450px)
        .options
            grid-template-columns: max-content 7rem max-content
</style>
