<script>
    import { getContext } from "svelte";

    export let tweet;

    const theme = getContext("theme");

    $: ({ author_id, users } = tweet);

    $: authorInfo = users.find((u) => u.id === author_id);
    $: url = `https://twitter.com/${authorInfo.username}`;

    const twitterSrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/twitter.png";
</script>

<div class="header">
    <a
        href={url}
        class="avatar exclude {$theme}"
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
            src={authorInfo.profile_image_url}
            alt={authorInfo.name}
            width={36}
            height={36}
        />
    </a>
    <a
        href={url}
        class="author exclude {$theme}"
        target="_blank"
        rel="noopener noreferrer"
    >
        <span class="name" title={authorInfo.name}>
            {authorInfo.name}
        </span>
        <span class="username {$theme}" title={`@${authorInfo.username}`}>
            @{authorInfo.username}
        </span>
    </a>
    <a
        href={url}
        class="brand exclude"
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
            class="icon twitterIcon"
            title="View on Twitter"
            alt="twitter"
            src={twitterSrc}
        />
    </a>
</div>

<style lang="sass">
    @import "../../common"
    .header
        display: flex

    .avatar
        height: 36px
        width: 36px
        margin-right: 0.625rem

        & > img
            border: map-get($light, tweet-avatar-border)
            border-radius: 50%

        &.dark > img
            border: map-get($dark, tweet-avatar-border)

    .author
        text-decoration: none
        color: inherit
        transition: color 0.3s ease-in-out

        &:hover
            color: map-get($light, tweet-link-color-hover)

        &.dark:hover
            color: map-get($dark, tweet-link-color-hover)

    .name,
    .username
        display: table
        line-height: 1.2
        text-overflow: ellipsis
        white-space: nowrap
        overflow: hidden

    .name
        font-weight: 700

    .username
        color: map-get($light, tweet-color-gray)
        font-size: 0.875rem

        &.dark
            color: map-get($dark, tweet-color-gray)

    .brand
        margin-left: auto

    .twitterIcon
        width: 1.25em
        height: 1.25em
        object-fit: contain
</style>
