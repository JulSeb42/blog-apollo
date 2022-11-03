/*=============================================== Create first account ===============================================*/

import { gql } from "@apollo/client"

export const CREATE_FIRST_ACCOUNT = gql`
    mutation ($firstUserInput: FirstUserInput) {
        createFirstAccount(firstUserInput: $firstUserInput) {
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
