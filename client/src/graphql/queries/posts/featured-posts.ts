/*=============================================== Featured posts ===============================================*/

import { gql } from "@apollo/client"

export const FEATURED_POSTS = gql`
    query {
        posts(filters: { featured: true }) {
            _id
            title
            imageUrl
            slug
        }
    }
`
