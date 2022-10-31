/*=============================================== Category inputs ===============================================*/

import { gql } from "apollo-server"

export const CategoryInputs = gql`
    input NewCategoryInput {
        name: String!
    }

    input UpdateCategoryInput {
        _id: ID!
        name: String!
    }

    input FilterCategoryInput {
        withPosts: Boolean
    }
`
