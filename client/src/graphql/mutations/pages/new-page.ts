/*=============================================== New page ===============================================*/

import { gql } from "@apollo/client"

export const NEW_PAGE = gql`
    mutation ($newPageInput: NewPageInput) {
        newPage(newPageInput: $newPageInput) {
            _id
            title
            slug
            draft
        }
    }
`
