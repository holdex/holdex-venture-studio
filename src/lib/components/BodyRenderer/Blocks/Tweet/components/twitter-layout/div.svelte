<div dir="auto" class={$$props.className}>
    <slot />
</div>

<style lang="sass">
    @import "../common"

    .image-container
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(50%, 1fr))
        margin: $container-margin

    .image-count-3 > :global(:first-child)
        grid-row-end: span 2

    .gif-container,
    .video-container
        margin: $container-margin

    .gif-container > :global(video),
    .video-container > :global(video)
        width: 100%
        max-height: 500px

    .content-container
        margin: $text-margin
        white-space: pre-wrap
        word-wrap: break-word
</style>
