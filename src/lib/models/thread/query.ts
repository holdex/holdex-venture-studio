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
    }
`;

export const getMessageById = gql`
    query getMessageById($id: ID!) {
        message(id: $id) {
            ...MessageFragment
        }
    },
    ${messageFragment}
`;

