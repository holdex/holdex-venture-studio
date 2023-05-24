<script>
    const { alt, src } = $$props;
</script>

<span class="emoji">
    <img {alt} {src} width={18} height={18} />
</span>

<style>
    .emoji {
        margin: 0 2px;
        vertical-align: -3px;
        display: inline-flex;
    }
    img {
        position: relative;
        width: 18px;
        height: 18px;
    }
</style>
