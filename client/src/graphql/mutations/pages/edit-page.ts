/*=============================================== Edit page ===============================================*/

import { gql } from "@apollo/client"

export const EDIT_PAGE = gql`
    mutation ($editPageInput: EditPageInput) {
        editPage(editPageInput: $editPageInput) {
            _id
            title
            slug
            draft
        }
    }
`
