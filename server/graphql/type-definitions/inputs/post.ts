/*=============================================== Post inputs ===============================================*/

import { gql } from "apollo-server"

export const PostInputs = gql`
    input NewPostInput {
        title: String!
        tags: [String!]!
        draft: Boolean!
        body: String!
        metaDescription: String!
        featured: Boolean!
        imageUrl: String!
        slug: String!
        category: String!
        author: String!
    }

    input EditPostInput {
        _id: ID!
        title: String!
        tags: [String!]!
        draft: Boolean!
        body: String!
        metaDescription: String!
        featured: Boolean!
        imageUrl: String!
        slug: String!
        category: String!
    }

    input FilterPostsInput {
        featured: Boolean
        draft: Boolean
    }
`
