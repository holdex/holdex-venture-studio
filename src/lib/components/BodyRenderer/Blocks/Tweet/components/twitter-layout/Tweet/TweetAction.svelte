<script>
    import { getContext } from "svelte";
    import { formatNumber } from "../../lib/utils";

    export let tweet;
    const theme = getContext("theme");

    $: ({ author_id, users, public_metrics, id } = tweet);

    $: authorInfo = users.find((u) => u.id === author_id);

    $: userUrl = `https://twitter.com/${authorInfo.username}`;
    $: tweetUrl = `${userUrl}/status/${id}`;

    $: count = public_metrics.retweet_count + public_metrics.reply_count;
    $: isConversation = count > 4;

    let chevronSrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/chevron.png";
    let profileSrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/person.png";
    let replySrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/reply.png?v=1";
</script>

{#if isConversation}
    <a
        class="exclude {$theme}"
        href={tweetUrl}
        title="View the conversation on Twitter"
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
            loading="lazy"
            class="icon icon-reply"
            alt="reply"
            src={replySrc}
        />
        <span class="text">
            {formatNumber(count)} people are talking about this
        </span>
        <img
            loading="lazy"
            class="icon icon-chevron"
            alt="chevron"
            src={chevronSrc}
        />
    </a>
{:else}
    <a
        class="exclude {$theme}"
        href={userUrl}
        title={`View ${authorInfo.name}'s profile on Twitter`}
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
            loading="lazy"
            class="icon icon-profile"
            alt="user"
            src={profileSrc}
        />
        <span class="text">See {authorInfo.name}'s other Tweets</span>
        <img
            loading="lazy"
            class="icon icon-chevron"
            alt="chevron"
            src={chevronSrc}
        />
    </a>
{/if}

<style lang="sass">
    @import "../../common"

    a
        display: block
        color: map-get($light, tweet-link-color)
        font-size: 0.875rem
        padding: 0.625rem 1.25rem
        text-decoration: none
        border-top: map-get($light, tweet-border)
        transition: color 0.3s ease-in-out

        &:hover
            color: map-get($light, tweet-link-color-hover)!important

            .icon-reply
                object-position: 100% 50%

        &.dark
            color: map-get($dark, tweet-link-color)
            border-top: map-get($dark, tweet-border)

            &:hover
                color: map-get($dark, tweet-link-color-hover)!important

    
    .icon
        vertical-align: top
        width: 1.25em
        object-fit: contain

    .icon-reply
        width: 1.25em
        object-fit: cover
        object-position: 0% 50%
        transition: object-position .3s ease-in-out

    .icon-chevron
        float: right
        margin-left: auto

    .text
        margin-left: 0.25rem
        display: inline-block
        max-width: calc(100% - 50px)
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
</style>
