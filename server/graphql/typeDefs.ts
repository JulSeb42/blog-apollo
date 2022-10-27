/*=============================================== Type definitions ===============================================*/

import { gql } from "apollo-server"

const typeDefs = gql`
    enum UserRoles {
        admin
        writer
        moderator
    }

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
        bio: String
        imageUrl: String
    }

    input EditPasswordInput {
        _id: ID!
        oldPassword: String!
        newPassword: String!
    }

    input NewCommentInput {
        post: String!
        poster: String!
        body: String!
    }

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

    input FilterUsersInput {
        featured: Boolean
    }

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

    input NewPageInput {
        title: String!
        slug: String!
        body: String!
        metaDescription: String
        keywords: [String!]
        draft: Boolean
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
        bio: String
        imageUrl: String
        role: UserRoles!
        approved: Boolean
        featured: Boolean
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
        category: Category!
        author: User!
        comments: [Comment!]
    }

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

    type Query {
        users(filters: FilterUsersInput): [User!]
        user(fullName: String!): User!
        userById(_id: ID!): User!
        userByToken(token: String!): User

        categories(filters: FilterCategoryInput): [Category!]
        category(name: String!): Category!
        categoryById(_id: ID!): Category!

        comments: [Comment!]
        comment(_id: ID!): Comment!

        posts(filters: FilterPostsInput): [Post!]
        post(slug: String!): Post!
        postById(_id: ID!): Post!

        pages: [Page!]
        page(slug: String!): Page
        pageById(_id: ID!): Page
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

        newComment(newCommentInput: NewCommentInput): Comment!
        deleteComment(_id: ID!): String

        newPost(newPostInput: NewPostInput): Post!
        editPost(editPostInput: EditPostInput): Post!
        deletePost(_id: ID!): String

        newCategory(newCategoryInput: NewCategoryInput): Category!
        updateCategory(updateCategoryInput: UpdateCategoryInput): Category!
        deleteCategory(_id: ID!): String

        newPage(newPageInput: NewPageInput): Page!
    }
`

export default typeDefs
