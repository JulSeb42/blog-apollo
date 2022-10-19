/*=============================================== Type definitions ===============================================*/

import { gql } from "apollo-server"

const typeDefs = gql`
    input SignupInput {
        fullName: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input VerifyInput {
        _id: ID!
        verifyToken: String!
    }

    input ForgotInput {
        email: String!
    }

    input ResetInput {
        _id: ID!
        resetToken: String!
        password: String!
    }

    input EditUserInput {
        _id: ID!
        fullName: String
    }

    input EditPasswordInput {
        _id: ID!
        oldPassword: String!
        newPassword: String!
    }

    type User {
        _id: ID!
        fullName: String!
        email: String!
        password: String!
        verified: Boolean!
        verifyToken: String!
        resetToken: String
        token: String!
        posts: [Post!]
    }

    type Category {
        _id: ID!
        name: String!
        posts: [Post!]
    }

    type Comment {
        _id: ID!
        poster: String
        body: String!
        post: Post!
        date: String!
        time: String!
    }

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
        category: Category
        author: User!
        comments: [Comment]!
    }

    type Query {
        users: [User!]
        user(_id: ID!): User!

        categories: [Category!]
        category(_id: ID!): Category!

        comments: [Comment!]
        comment(_id: ID!): Comment!

        posts: [Post!]
        post(_id: ID!): Post!
    }

    type Mutation {
        signup(signupInput: SignupInput): User!
        verifyUser(verifyInput: VerifyInput): User!
        login(loginInput: LoginInput): User!
        forgotPassword(forgotInput: ForgotInput): User!
        resetPassword(resetInput: ResetInput): User!

        editUser(editUserInput: EditUserInput): User!
        editPassword(editPasswordInput: EditPasswordInput): User!
        deleteUser(_id: ID!): String
    }
`

export default typeDefs
