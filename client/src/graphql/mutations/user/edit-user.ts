/*=============================================== Edit user ===============================================*/

import { gql } from "@apollo/client"

const EDIT_USER = gql`
    mutation ($editUserInput: EditUserInput) {
        editUser(editUserInput: $editUserInput) {
            _id
            email
            fullName
            token
            bio
            imageUrl
            password
            verified
            verifyToken
            resetToken
            role
            approved
            featured
        }
    }
`

export { EDIT_USER }
