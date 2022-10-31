/*=============================================== Post type ===============================================*/

import { gql } from "apollo-server"

export const PostType = gql`
    type Post {
        _id: ID!
        title: String!
        date: String!
        time: String!
        dateEdited: String
        timeEdited: String
        tags: [String]!
        draft: Boolean!
        body: String!
        metaDescription: String!
        featured: Boolean!
        imageUrl: String!
        slug: String!
        category: Category!
        author: User!
        comments: [Comment!]
    }
`
