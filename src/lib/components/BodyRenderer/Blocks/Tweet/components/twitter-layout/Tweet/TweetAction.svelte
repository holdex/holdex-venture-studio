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
        div.info 
            a(class="like exclude {$theme}" 
                href="likeUrl" 
                title="Like" 
                target="_blank" 
                rel="noopener noreferrer")
                    div.icon.icon-heart
                        Icon(icon="{HeartIcon}" width="{24}" height="{24}" colorInherit)
                    unless likeCount == 0
                        span.likes 
                            p {likeCount}
            a(class=" exclude {$theme}" 
                href="likeUrl" 
                title="Like" 
                target="_blank" 
                rel="noopener noreferrer")
                    div.icon
                        Icon(icon="{ReplyIcon}" width="{24}" height="{24}" colorInherit)
                    span.text
                        p Reply 

            a(class=" exclude {$theme}" 
                title="Reply to tweet" 
                target="_blank" 
                rel="noopener noreferrer")
                    div.icon.link
                        Icon(icon="{CopyLinkIcon}" width="{24}" height="{24}" colorInherit)
                    span.text
                        p Copy Link 
        div.replies 
            a(class="readReplies"            
                href="{tweetUrl}"
                title="Read replies to tweet" 
                target="_blank" 
                rel="noopener noreferrer"
            )
                p Read {replyCount} replies

</template>

<style lang="sass">
    @import "../../common"
    .actions
        border-top: map-get($dark, tweet-border)
        flex-direction: column
        display: flex
    
    .info
        display: flex
        margin-top: 0.2rem
        
    .replies
        display: flex
        align-items: center
        justify-content: center

    .readReplies
        display: flex
        align-items: center
        justify-content: center
        width: 95%
        height: 32px
        background: map-get($dark, tweet-btn-color)
        border: map-get($dark, tweet-btn-border)
        border-radius: 999px
        margin-bottom: 15px

        font-style: normal
        font-weight: 700
        font-size: 14px
        line-height: 32px
        color: map-get($dark, link-color)

        &:hover
            background: transparent

    a
        display: block
        color: map-get($light, tweet-link-color)
        font-size: 0.875rem
        padding: 0.625rem 1.25rem
        text-decoration: none
        transition: color 0.3s ease-in-out


        &:hover
            color: map-get($light, tweet-link-color-hover)!important

        &.dark
            color: map-get($dark, tweet-link-color)

            &:hover
                color: map-get($dark, tweet-link-color-hover)!important

    
    .icon
        vertical-align: top

    .link
        color: map-get($dark,tweet-color-gray )

    
    .likes
        margin-left: 0.5rem
        display: inline-block
        // max-width: calc(100% - 50px)
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        font-family: $tweet-font
        font-style: normal
        font-weight: 700
        font-size: 14px
        line-height: 20px
        color: map-get($dark, tweet-color-red)    

    .text
        margin-left: 0.5rem
        display: inline-block
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        font-family: $tweet-font
        font-style: normal
        font-weight: 700
        font-size: 14px
        line-height: 20px
        color: map-get($dark, tweet-color-gray)    

	
    .icon-heart
        color: map-get($dark, tweet-color-red)    



</style>
