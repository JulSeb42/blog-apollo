/*=============================================== New post ===============================================*/

import { gql } from "@apollo/client"

export const NEW_POST = gql`
    mutation ($newPostInput: NewPostInput) {
        newPost(newPostInput: $newPostInput) {
            _id
        }
    }
`
