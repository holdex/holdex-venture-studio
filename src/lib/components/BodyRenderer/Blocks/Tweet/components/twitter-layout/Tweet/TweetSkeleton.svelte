<script>
    import { getContext } from "svelte";

    import Skeleton from "../skeleton/index.svelte";

    export let simple = false;

    let theme = getContext("theme");
</script>

<div class="container {$theme}">
    <div class="content">
        <Skeleton style="height: 2.25rem" />
        <Skeleton style="height: 7rem; margin: 1.25rem 0" />
        <Skeleton style="height: 1.25rem" />
    </div>
    {#if !simple}
        <div class="footer {$theme}">
            <Skeleton style="height: 1.25rem" />
        </div>
    {/if}
</div>

<style lang="sass">
    @import "../../common"

    .container
        background: map-get($light,tweet-bg-color)
        border: map-get($light, tweet-border)
        border-radius: 5px
        margin: $container-margin

        &.dark
            background: map-get($dark, tweet-bg-color)
            border: map-get($dark, tweet-border)
    
    .content
        padding: 1.25rem 1.25rem 0.625rem 1.25rem

    .footer
        height: 2.5rem
        padding: 0.625rem 1.25rem
        border-top: map-get($light, tweet-border)

        &.dark
            border-top: map-get($dark, tweet-border)
</style>
