/*=============================================== Header pages ===============================================*/

import { gql } from "@apollo/client"

export const HEADER_PAGES = gql`
    query {
        pages(filters: { header: true, draft: false }) {
            _id
            slug
            title
            header
            orderHeader
        }
    }
`
