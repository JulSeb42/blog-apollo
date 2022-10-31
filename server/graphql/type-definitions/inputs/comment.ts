/*=============================================== Comment inputs ===============================================*/

import { gql } from "apollo-server"

export const CommentInputs = gql`
    input NewCommentInput {
        post: String!
        poster: String!
        body: String!
    }
`
