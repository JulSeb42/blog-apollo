/*=============================================== All pages ===============================================*/

import { gql } from "@apollo/client"

export const ALL_PAGES = gql`
    query {
        pages {
            _id
            title
            slug
            draft
        }
    }
`
