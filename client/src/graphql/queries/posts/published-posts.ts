/*=============================================== Published posts ===============================================*/

import { gql } from "@apollo/client"

export const PUBLISHED_POSTS = gql`
    query {
        posts(filters: { draft: false }) {
            _id
            category {
                name
            }
            date
            title
            imageUrl
            body
            slug
            metaDescription
        }
    }
`
