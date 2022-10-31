/*=============================================== Edit password ===============================================*/

import { gql } from "@apollo/client"

const EDIT_PASSWORD = gql`
    mutation ($editPasswordInput: EditPasswordInput) {
        editPassword(editPasswordInput: $editPasswordInput) {
            _id
            email
            fullName
            token
            bio
            imageUrl
            password
            generatedPassword
            resetToken
            role
            approved
            featured
        }
    }
`

export { EDIT_PASSWORD }
