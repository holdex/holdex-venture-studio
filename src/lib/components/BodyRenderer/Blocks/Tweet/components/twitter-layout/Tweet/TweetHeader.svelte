<script>
	import { getContext } from 'svelte';

	export let tweet;

	const theme = getContext('theme');

	$: ({ author_id, users } = tweet);

	$: authorInfo = users.find((u) => u.id === author_id);
	$: url = `https://twitter.com/${authorInfo.username}`;

	const twitterSrc = 'https://storage.googleapis.com/stage-holdex-public/assets/twitter.png';
</script>

<div class="flex">
	<a
		href={url}
		class="avatar h-9 w-9 mr-2.5 exclude {$theme}"
		target="_blank"
		rel="noopener noreferrer"
	>
		<img src={authorInfo.profile_image_url} alt={authorInfo.name} width={36} height={36} />
	</a>
	<a
		href={url}
		class="author no-underline text-inherit transition-[color] duration-[0.3s] ease-[ease-in-out] exclude {$theme}"
		target="_blank"
		rel="noopener noreferrer"
	>
		<span class="name font-bold" title={authorInfo.name}>
			{authorInfo.name}
		</span>
		<div class="flex">
			<span
				class="text-sm table leading-[1.2] text-ellipsis whitespace-nowrap overflow-hidden {$theme}"
				title={`@${authorInfo.username}`}
			>
				@{authorInfo.username}
			</span>
			<a
				class="not-italic font-bold text-sm leading-5 ml-[15px] -mt-0.5 before:absolute before:mt-[-3px] before:content-['.'] before:font-medium before:text-sm before:leading-5 before:-ml-2.5;"
				href={url}>Follow</a
			>
		</div>
	</a>
	<a href={url} class="brand ml-auto exclude" target="_blank" rel="noopener noreferrer">
		<img
			class="icon w-[1.25em] h-[1.25em] object-contain saturate-[0%]"
			title="View on Twitter"
			alt="twitter"
			src={twitterSrc}
		/>
	</a>
</div>

<style lang="sass">
    @import "../../common"
    .avatar
        & > img
            border: map-get($light, tweet-avatar-border)
            @apply rounded-[50%]

        &.dark > img
            border: map-get($dark, tweet-avatar-border)

    .author
        &:hover
            color: map-get($light, tweet-link-color-hover)

        &.dark:hover
            color: map-get($dark, tweet-link-color-hover)
            
    .username
        color: map-get($light, tweet-color-gray)

        &.dark
            color: map-get($dark, tweet-color-gray)

    .follow 
        color: map-get($light, tweet-link-color-hover)
        &:before 
            color: map-get($dark, tweet-color-gray)      

</style>
