/*=============================================== Login ===============================================*/

import { gql } from "@apollo/client"

const LOGIN = gql`
    mutation login($loginInput: LoginInput) {
        login(loginInput: $loginInput) {
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

export { LOGIN }
