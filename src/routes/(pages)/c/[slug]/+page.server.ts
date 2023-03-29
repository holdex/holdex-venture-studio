import { loadCategory } from '$lib/models/category'
import type { CommunityPostedMessagesConnectionInput, MessagesSortBy } from '$lib/types/api';
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, params, url }) => {

    const filter = url.searchParams.get('filter');
    const q = url.searchParams.get('q');

    const feedInput: CommunityPostedMessagesConnectionInput = {
        includeReplies: false,
        sortDesc: true,
        filterByVotesStartingFrom: 0,
        searchTerm: q ?? '',
        ...parseQueryFilter(filter),
        pageInfo: {
            first: 25
        }
    }

    const options = await loadCategory(locals.apolloClient, params.slug, feedInput);

    return {
        queryOptions: JSON.stringify(options),
        apollo: locals.apolloClient.extract()
    }
}

const parseQueryFilter = (filter: any | MessagesSortBy) => {
    switch (filter) {
        case "CREATED_AT":
        case "NET_UP_VOTES":
            return {
                sortBy: filter,
            };
        case undefined:
        case null:
            return {
                sortBy: "CREATED_AT" as MessagesSortBy,
            };
        default:
            return {
                sortBy: "CREATED_AT" as MessagesSortBy,
                filterByHashtags: [filter],
            };
    }
};
