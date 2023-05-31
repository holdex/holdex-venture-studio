<script lang="ts">
	import { getContext } from 'svelte';
	import { formatNumber } from '../../lib/utils';

	import { CopyLinkIcon, HeartIcon, ReplyIcon } from '../Icons';
	import Icon from '$components/Icons/index.svelte';
	export let tweet;

	const theme = getContext('theme');

	$: ({ author_id, users, public_metrics, id } = tweet);

	$: authorInfo = users.find((u) => u.id === author_id);

	$: userUrl = `https://twitter.com/${authorInfo.username}`;
	$: tweetUrl = `${userUrl}/status/${id}`;

	$: count = public_metrics.retweet_count + public_metrics.reply_count;
	$: likeCount = public_metrics.like_count;
	$: replyCount = public_metrics.reply_count;

	$: isConversation = count > 4;

	let chevronSrc = 'https://storage.googleapis.com/stage-holdex-public/assets/chevron.png';
	let profileSrc = 'https://storage.googleapis.com/stage-holdex-public/assets/person.png';
	let replySrc = 'https://storage.googleapis.com/stage-holdex-public/assets/reply.png?v=1';
	let heartSrc = 'https://storage.googleapis.com/stage-holdex-public/assets/heart.png?v=1';
	let likeUrl = `https://twitter.com/intent/like?tweet_id=${id}`;
	let replyUrl = '';

	function gotoTweet(tweetUrl: string) {
		window.open(tweetUrl, '_blank').focus();
	}
</script>

<template lang="pug">
    div.actions 
        div(class="flex mt-[0.2rem]") 
            a(class="block text-sm no-underline transition-[color] duration-[0.3s] ease-[ease-in-out] px-5 py-2.5 like exclude {$theme}" 
                href="{tweetUrl}"
                title="Like" 
                target="_blank" 
                rel="noopener noreferrer")
                    div.icon.icon-heart
                        Icon(icon="{HeartIcon}" width="{24}" height="{24}" colorInherit)
                    unless likeCount == 0
                    span(class="inline-block whitespace-nowrap overflow-hidden text-ellipsis not-italic font-bold text-sm leading-5 ml-2")
                            p {likeCount}

            a(class="block text-sm no-underline transition-[color] duration-[0.3s] ease-[ease-in-out] px-5 py-2.5 exclude {$theme}" 
                href="{tweetUrl}"
                title="Like" 
                target="_blank" 
                rel="noopener noreferrer")
                    div.icon
                        Icon(icon="{ReplyIcon}" width="{24}" height="{24}" colorInherit)
                    span(class="inline-block whitespace-nowrap overflow-hidden text-ellipsis not-italic font-bold text-sm leading-5 ml-2")
                        p Reply 

            a(class="block text-sm no-underline transition-[color] duration-[0.3s] ease-[ease-in-out] px-5 py-2.5 exclude {$theme}" 
                title="Reply to tweet" 
                target="_blank" 
                rel="noopener noreferrer")
                    div(class="icon link")
                        Icon(icon="{CopyLinkIcon}" width="{24}" height="{24}" colorInherit)
                    span(class="inline-block whitespace-nowrap overflow-hidden text-ellipsis not-italic font-bold text-sm leading-5 ml-2")
                        p Copy Link 
        div(class="flex items-center justify-center") 
            a(class="readReplies block text-sm no-underline transition-[color] duration-[0.3s] ease-[ease-in-out] px-5 py-2.5"            
                href="{tweetUrl}"
                title="Read replies to tweet" 
                target="_blank" 
                rel="noopener noreferrer"
            )
                p Read {replyCount} replies

</template>

<style lang="sass">

    @import "../../../../../../../styles/theme"

    .actions
        border-top: map-get($tw-dark, tweet-border)

    .replies
        @apply flex items-center justify-center

    .readReplies
        @apply flex items-center justify-center w-[95%] h-8 not-italic font-bold leading-8 mb-[15px] rounded-[999px]
        color: map-get($tw-dark, link-color)
        background: map-get($tw-dark, tweet-btn-color)
        border: map-get($tw-dark, tweet-btn-border)
        font-size: 14px

        &:hover
            background: transparent

    a
        font-size: 0.875rem
        color: map-get($tw-light, tweet-link-color)
        
        &:hover
            color: map-get($tw-light, tweet-link-color-hover)!important

        &.dark
            color: map-get($tw-dark, tweet-link-color)

            &:hover
                color: map-get($tw-dark, tweet-link-color-hover)!important

    
    .icon
        @apply align-top

    .link
        color: map-get($tw-dark,tweet-color-gray )
    
    .likes
        font-family: normal normal 18px/1.4 Helvetica, Roboto, "Segoe UI", Calibri,
    sans-serif
        color: map-get($tw-dark, tweet-color-red)    

    .text
        font-family: normal normal 18px/1.4 Helvetica, Roboto, "Segoe UI", Calibri,
    sans-serif
        color: map-get($tw-dark, tweet-color-gray)    

    .icon-heart
        color: map-get($tw-dark, tweet-color-red)
</style>
