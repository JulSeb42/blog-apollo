/*=============================================== Thank you input ===============================================*/

import { gql } from "apollo-server"

export const ThankYouInput = gql`
    input ThankYouInput {
        _id: ID!
        title: String
        body: String
    }
`
