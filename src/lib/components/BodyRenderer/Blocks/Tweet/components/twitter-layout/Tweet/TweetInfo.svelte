<script>
	import { timeFormat } from '$components/DateManager';

	import { getContext } from 'svelte';

	export let tweet;
	const theme = getContext('theme');

	$: ({ author_id, id, users, created_at, public_metrics } = tweet);

	$: authorInfo = users.find((u) => u.id === author_id);

	$: tweetUrl = `https://twitter.com/${authorInfo.username}/status/${id}`;
	$: createdAt = new Date(created_at);
</script>

<div class="text-sm flex">
	{#if createdAt}
		<a
			class="no-underline not-italic font-medium text-sm leading-5 focus:underline exclude {$theme}"
			href={tweetUrl}
			target="_blank"
			rel="noopener noreferrer"
		>
			<time title={`Time Posted: ${createdAt.toUTCString()}`} dateTime={createdAt.toISOString()}>
				{timeFormat(createdAt, 'h:mm A - MMM D, Y')}
			</time>
		</a>
	{/if}
</div>

<style lang="sass">
    @import "../../common"

    .time
        color: map-get($light, tweet-color-gray)
        font-family: $tweet-font

        &:hover,
        &:focus
            color: map-get($light, tweet-link-color-hover)

        &.dark
            color: map-get($dark, tweet-color-gray)

            &:hover,
            &:focus
                color: map-get($dark, tweet-link-color-hover)
</style>
