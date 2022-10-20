/*=============================================== Get all posts ===============================================*/

import { gql } from "@apollo/client"

export const ALL_POSTS = gql`
    query {
        posts {
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
