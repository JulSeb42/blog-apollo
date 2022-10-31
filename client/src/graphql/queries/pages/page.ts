/*=============================================== Page ===============================================*/

import { gql } from "@apollo/client"

export const PAGE = gql`
    query ($slug: String!) {
        page(slug: $slug) {
            _id
            slug
            title
            body
            metaDescription
            keywords
            draft
        }
    }
`
