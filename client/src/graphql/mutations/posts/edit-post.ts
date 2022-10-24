/*=============================================== Edit post ===============================================*/

import { gql } from "@apollo/client"

export const EDIT_POST = gql`
    mutation ($editPostInput: EditPostInput) {
        editPost(editPostInput: $editPostInput) {
            _id
            title
        }
    }
`
