/*=============================================== Login ===============================================*/

import { gql } from "@apollo/client"

const LOGIN = gql`
    mutation ($loginInput: LoginInput) {
        login(loginInput: $loginInput) {
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

export { LOGIN }
