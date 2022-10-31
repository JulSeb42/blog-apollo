/*=============================================== Comment type ===============================================*/

import { gql } from "apollo-server"

export const CommentType = gql`
    type Comment {
        _id: ID!
        poster: String
        body: String!
        post: Post!
        date: String!
        time: String!
    }
`
