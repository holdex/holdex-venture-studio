<script>
    import format from "date-fns/format";
    import { getContext } from "svelte";
    import { formatNumber } from "../../lib/utils";

    export let tweet;
    const theme = getContext("theme");

    $: ({ author_id, id, users, created_at, public_metrics } = tweet);

    $: authorInfo = users.find((u) => u.id === author_id);
    $: likeUrl = `https://twitter.com/intent/like?tweet_id=${id}`;
    $: tweetUrl = `https://twitter.com/${authorInfo.username}/status/${id}`;
    $: createdAt = new Date(created_at);

    let heartSrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/heart.png?v=1";
</script>

<div class="info">
    <a
        class="like exclude {$theme}"
        href={likeUrl}
        title="Like"
        target="_blank"
        rel="noopener noreferrer"
    >
        <span class="heart">
            <img class="icon icon-heart" alt="heart" src={heartSrc} />
        </span>
        {#if public_metrics.like_count > 0}
            <span class="likes">{formatNumber(public_metrics.like_count)}</span>
        {/if}
    </a>
    {#if createdAt}
        <a
            class="time exclude {$theme}"
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            <time
                title={`Time Posted: ${createdAt.toUTCString()}`}
                dateTime={createdAt.toISOString()}
            >
                {format(createdAt, "h:mm a - MMM d, y")}
            </time>
        </a>
    {/if}
</div>

<style lang="sass">
    @import "../../common"

    a
        text-decoration: none

    .info
        font-size: 0.875rem
        display: flex

    .icon
        vertical-align: top
        width: 1.25em
        object-fit: contain

    .icon-heart
        width: 1.25em
        object-fit: cover
        object-position: 0% 50%
        transition: object-position .3s ease-in-out

    .like
        display: inline-block
        color: map-get($light, tweet-color-gray)
        margin-right: 0.75rem
        transition: color .3s ease-in-out

        &:visited
            color: map-get($light, tweet-color-gray)!important

        &:hover
            color: map-get($light, tweet-color-red)!important

            .icon-heart
                object-position: 100% 50%

        &.dark
            color: map-get($dark, tweet-color-gray)

            &:visited
                color: map-get($dark, tweet-color-gray)!important

            &:hover
                color: map-get($dark, tweet-color-red)!important

    .likes
        margin-left: 0.25rem
        color: inherit

    .time
        color: map-get($light, tweet-color-gray)

        &:hover,
        &:focus
            color: map-get($light, tweet-link-color-hover)

        &:focus
            text-decoration: underline

        &.dark
            color: map-get($dark, tweet-color-gray)

            &:hover,
            &:focus
                color: map-get($dark, tweet-link-color-hover)
</style>
