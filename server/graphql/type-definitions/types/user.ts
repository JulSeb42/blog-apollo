/*=============================================== User type ===============================================*/

import { gql } from "apollo-server"

export const UserType = gql`
    type User {
        _id: ID!
        fullName: String!
        email: String!
        password: String!
        generatedPassword: String!
        resetToken: String
        token: String!
        posts: [Post!]
        bio: String
        imageUrl: String
        role: UserRoles!
        approved: Boolean
        featured: Boolean
    }
`
