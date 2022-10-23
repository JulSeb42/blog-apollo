/*=============================================== New comment ===============================================*/

import { gql } from "@apollo/client"

export const NEW_COMMENT = gql`
    mutation ($newCommentInput: NewCommentInput) {
        newComment(newCommentInput: $newCommentInput) {
            _id
            poster
            body
            date
            time
        }
    }
`
