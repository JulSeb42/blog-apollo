/*=============================================== Global type ===============================================*/

import { gql } from "apollo-server"

export const GlobalType = gql`
    type GlobalData {
        _id: ID!
        name: String
        baseline: String
        metaDescription: String
        favicon: String
        email: String
        cover: String
        keywords: [String]
        language: String
        isGlobalSetup: Boolean
    }
`
