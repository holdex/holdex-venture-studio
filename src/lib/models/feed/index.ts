import { error } from '@sveltejs/kit';
import { hydrateApolloClient, query, readQuery } from '$components/ApolloClient';
import { getFeedMessages } from './query';

import type { ApolloClient } from '@apollo/client/core';
import type { PostedMessagesConnection, PostedMessagesConnectionInput } from '$lib/types/api';


export type FeedQuery = {
    feedInput: PostedMessagesConnectionInput
}

const loadFeed = async (client: ApolloClient<any>, feedInput: PostedMessagesConnectionInput) => {
    const options = {
        query: getFeedMessages,
        variables: {
            feedInput
        } as FeedQuery,
        context: {
            uri: "https://api.holdex.io/graphql"
        }
    }
    const result = await query<PostedMessagesConnection>(client, options, true);
    if (result.error || (!result || result.data === null)) {
        throw error(404, "not_found");
    }
    return options;
}

const getFeed = async <T>(apollo: any, options: any, fallback?: T) => {
    const client = hydrateApolloClient(apollo, options.context);
    return readQuery<T>(client, options, fallback);
}

export { loadFeed, getFeed }