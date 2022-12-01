/*=============================================== Thank you type ===============================================*/

import { gql } from "apollo-server"

export const ThankYouType = gql`
    type ThankYou {
        _id: ID!
        title: String
        body: String
    }
`
