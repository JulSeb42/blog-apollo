/*=============================================== Global inputs ===============================================*/

import { gql } from "apollo-server"

export const GlobalInputs = gql`
    input GlobalInput {
        _id: ID!
        name: String
        baseline: String
        metaDescription: String
        favicon: String
        email: String
        cover: String
        keywords: [String!]
        language: String
    }
`
