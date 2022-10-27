/*=============================================== Get page by ID ===============================================*/

import { gql } from "@apollo/client"

export const PAGE_BY_ID = gql`
    query ($_id: ID!) {
        pageById(_id: $_id) {
            _id
            title
            slug
            draft
            metaDescription
            keywords
            body
        }
    }
`
