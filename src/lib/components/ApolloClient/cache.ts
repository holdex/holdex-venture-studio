import type { InMemoryCacheConfig } from '@apollo/client/core'

const cacheConfig: InMemoryCacheConfig = {
    typePolicies: {
        Community: {
            fields: {
                postedMessages: {
                    keyArgs: [],
                    merge(existing, incoming) {
                        let edges = existing ? existing.edges.slice(0) : [];
                        let totalCount = existing ? existing.totalCount : 0;
                        let pageInfo = existing ? existing.pageInfo : {};

                        if (incoming) {
                            edges.push(...incoming.edges);
                            totalCount = incoming.totalCount;
                            pageInfo = incoming.pageInfo;
                        }
                        return {
                            __typename: "CommunityPostedMessagesConnection",
                            edges: edges,
                            totalCount: totalCount,
                            pageInfo: pageInfo,
                        }
                    }
                }
            }
        }
    }
}

export default cacheConfig;