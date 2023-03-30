import { gql } from '@apollo/client/core'
import { messageFragment } from '../message/query';

export const getFeedMessages = gql`
    query getFeedMessages($feedInput: PostedMessagesConnectionInput!) {
        postedMessages(input: $feedInput) {
            edges {
                node {
                    ...MessageFragment
                    postedIn {
                        node {
                            id
                            name
                            logoUrl
                            slug
                        }
                        messageSlug
                        allReplies(input: {
                            pageInfo: {first: 1}
                            sortBy: CREATED_AT
                            sortDesc: true
                        }) {
                            totalCount 
                        }       
                    }
                }
            }
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor

            }
            totalCount
        }
    },
    ${messageFragment}
`;