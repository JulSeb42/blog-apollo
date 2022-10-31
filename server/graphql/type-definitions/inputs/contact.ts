/*=============================================== Contact input ===============================================*/

import { gql } from "apollo-server"

export const ContactInput = gql`
    input ContactInput {
        name: String!
        email: String!
        subject: String!
        message: String!
    }
`
