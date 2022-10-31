/*=============================================== Page type ===============================================*/

import { gql } from "apollo-server"

export const PageType = gql`
    type Page {
        _id: ID!
        title: String!
        slug: String!
        body: String
        metaDescription: String
        keywords: [String!]
        draft: Boolean
        header: Boolean
        orderHeader: Int
        footer: Boolean
        orderFooter: Int
    }
`
