/*=============================================== Resolvers ===============================================*/

import { Query, Post, Category, User, Comment } from "./queries"
import {
    AuthMutation,
    UserMutation,
    PostMutation,
    CommentMutation,
    CategoryMutation,
    PageMutation,
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
    },
}

export default resolvers
