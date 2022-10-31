/*=============================================== Category type ===============================================*/

import { gql } from "apollo-server"

export const CategoryType = gql`
    type Category {
        _id: ID!
        name: String!
        posts: [Post!]
    }
`
