/*=============================================== Setup input ===============================================*/

import { gql } from "apollo-server"

export const SetupInputs = gql`
    input FirstUserInput {
        fullName: String!
        email: String!
        password: String!
        imageUrl: String!
        bio: String
    }

    input CreateGlobalInput {
        name: String!
        baseline: String
        metaDescription: String
        favicon: String
        email: String!
        cover: String
        keywords: [String!]
        language: String
    }
`
