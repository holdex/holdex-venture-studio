import { error } from '@sveltejs/kit';
import { hydrateApolloClient, query, readQuery } from '$components/ApolloClient';
import type { ApolloClient } from '@apollo/client/core';

import { getMessageById } from './query';
import type { Message } from '$lib/types/api';


const loadMessage = async (client: ApolloClient<any>, id: string) => {
    const options = {
        query: getMessageById,
        variables: {
            id
        }
    }
    let result = await query<{ message: Message }>(client, options);

    if (result.error || (result && result.data === null)) {
        throw error(404, "not_found");
    }
    return options;
}

const getMessage = async (apollo: any, options: any) => {
    const client = hydrateApolloClient(apollo);
    return readQuery<{ message: Message }>(client, options, { message: {} as Message });
}

export { loadMessage, getMessage }