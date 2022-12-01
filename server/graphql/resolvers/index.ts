/*=============================================== Resolvers ===============================================*/

import { Query, Post, Category, User, Comment } from "./queries"
import {
    AuthMutation,
    UserMutation,
    PostMutation,
    CommentMutation,
    CategoryMutation,
    PageMutation,
    GlobalMutation,
    ContactMutation,
    SetupMutation,
    ThankYouMutation,
} from "./mutations"

const resolvers = {
    // Queries
    Query,
    Post,
    Category,
    User,
    Comment,

    // Mutations
    Mutation: {
        ...AuthMutation,
        ...UserMutation,
        ...PostMutation,
        ...CommentMutation,
        ...CategoryMutation,
        ...PageMutation,
        ...GlobalMutation,
        ...ContactMutation,
        ...SetupMutation,
        ...ThankYouMutation,
    },
}

export default resolvers
