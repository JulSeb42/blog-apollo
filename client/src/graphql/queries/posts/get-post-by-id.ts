/*=============================================== Get post by id ===============================================*/

import { gql } from "@apollo/client"

export const GET_POST_BY_ID = gql`
    query ($_id: ID!) {
        postById(_id: $_id) {
            _id
            title
            tags
            draft
            metaDescription
            featured
            slug
            category {
                _id
                name
            }
            body
            imageUrl
        }
    }
`
