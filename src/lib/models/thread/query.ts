import { gql } from '@apollo/client/core'

const messageFragment = gql`
    fragment MessageFragment on Message  {
        id
        draft
        createdAt
        updatedAt
        publishedAt
        deletedAt
        title
        body
        hashtags
        votesCount {
            up
            down
        }
    }
`;

const messageViewerFragment = gql`
    fragment MessageViewerFragment on Message {
        viewerVote {
            voteType
        }
        viewerWatches {
            watchOption
            watchesSince
        }
    }
`

export const getMessageById = gql`
    query getMessageById($id: ID!) {
        message(id: $id) {
            ...MessageFragment
        }
    },
    ${messageFragment}
`;

export const getMessageByCategorySlug = gql`
    query getMessageByCategorySlug($category: String!, $messageSlug: String!) {
        community(slug: $category) {
            id
            slug
            name
            published
            postedThread(slug: $messageSlug) {
                node {
                    ...MessageFragment
                    ...MessageViewerFragment
                }
                messageSlug
                viewsCount
                allReplies(input: {
                    pageInfo: {first: 1}
                    sortBy: CREATED_AT
                    sortDesc: true
                }) {
                    totalCount 
                }
            }
        }
    },
    ${messageFragment},
    ${messageViewerFragment}
`;

