/*=============================================== Get user by token ===============================================*/

import { gql } from "@apollo/client"

export const USER_BY_TOKEN = gql`
    query ($token: String!) {
        userByToken(token: $token) {
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
