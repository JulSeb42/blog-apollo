/*=============================================== Footer pages ===============================================*/

import { gql } from "@apollo/client"

export const FOOTER_PAGES = gql`
    query {
        pages(filters: { footer: true, draft: false }) {
            _id
            slug
            title
            footer
            orderFooter
        }
    }
`
