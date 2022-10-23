/*=============================================== Posts dashboard ===============================================*/

import { gql } from "@apollo/client"

export const POSTS_DASHBOARD = gql`
    query {
        posts {
            _id
            title
            draft
            slug
            author {
                fullName
            }
            date
            time
            category {
                name
            }
        }
    }
`