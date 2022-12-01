/*=============================================== Query type ===============================================*/

import { gql } from "apollo-server"

export const QueryType = gql`
    type Query {
        users(filters: FilterUsersInput): [User!]
        user(fullName: String!): User
        userById(_id: ID!): User
        userByToken(token: String!): User

        categories(filters: FilterCategoryInput): [Category!]
        category(name: String!): Category
        categoryById(_id: ID!): Category

        comments: [Comment!]
        comment(_id: ID!): Comment

        posts(filters: FilterPostsInput): [Post!]
        post(slug: String!): Post
        postById(_id: ID!): Post

        pages(filters: FilterPagesInput): [Page!]
        page(slug: String!): Page
        pageById(_id: ID!): Page

        globalData: GlobalData

        contactPage: Contact!

        thankYouPage: ThankYou!
    }
`
