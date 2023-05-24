<script>
    import TweetHeader from "./TweetHeader.svelte";
    import TweetInfo from "./TweetInfo.svelte";
    import TweetAction from "./TweetAction.svelte";
    import { getContext } from "svelte";

    const { data, className } = $$props;

    let theme = getContext("theme");
</script>

<div class="tweet {className} {$theme}">
    <blockquote>
        <TweetHeader tweet={data} />
        <slot />
        <TweetInfo tweet={data} />
    </blockquote>
    <TweetAction tweet={data} />
</div>

<style lang="sass">
    @import "../../common"

    .tweet
        color: map-get($light, tweet-font-color)
        font: $tweet-font
        overflow: hidden
        background: map-get($light, tweet-bg-color)
        border: map-get($light, tweet-border)
        border-radius: 5px
        margin: $container-margin

        &:hover
            border: map-get($light, tweet-border-hover)
            transition: border-color 0.3s ease-in-out

    .dark
        color: map-get($dark, tweet-font-color)
        background: map-get($dark, tweet-bg-color)
        border: map-get($dark, tweet-border)

        &:hover
            border: map-get($dark, tweet-border-hover)


    blockquote
        position: relative
        padding: 1.25rem 1.25rem 0.625rem 1.25rem

    .tweet :global(.icon)
        display: inline-block
        height: 1.25em
</style>
