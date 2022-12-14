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

    input ShowPageInput {
        _id: ID!
        header: Boolean
        orderHeader: Int
        footer: Boolean
        orderFooter: Int
    }

    input FilterPagesInput {
        header: Boolean
        footer: Boolean
        draft: Boolean
    }
`
