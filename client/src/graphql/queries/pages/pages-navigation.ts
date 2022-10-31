/*=============================================== Pages navigation ===============================================*/

import { gql } from "@apollo/client"

export const PAGES_NAVIGATION = gql`
    query {
        pages {
            _id
            header
            orderHeader
            footer
            orderFooter
            title
            draft
        }
    }
`
