/*=============================================== Page inputs ===============================================*/

import { gql } from "apollo-server"

export const PageInputs = gql`
    input NewPageInput {
        title: String!
        slug: String!
        body: String!
        metaDescription: String
        keywords: [String!]
        draft: Boolean
    }

    input EditPageInput {
        _id: ID!
        title: String!
        slug: String!
        body: String!
        metaDescription: String
        keywords: [String!]
        draft: Boolean
    }
`
