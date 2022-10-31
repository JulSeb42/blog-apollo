/*=============================================== Auth inputs ===============================================*/

import { gql } from "apollo-server"

export const AuthInputs = gql`
    input LoginInput {
        email: String!
        password: String!
    }

    input ForgotInput {
        email: String!
    }

    input ResetInput {
        _id: ID!
        resetToken: String!
        password: String!
    }
`
