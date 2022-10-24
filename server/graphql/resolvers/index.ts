/*=============================================== Resolvers ===============================================*/

import { Query, Post, Category, User } from "./queries"
import {
    AuthMutation,
    UserMutation,
    PostMutation,
    CommentMutation,
    CategoryMutation,
} from "./mutations"

const resolvers = {
    // Queries
    Query,
    Post,
    Category,
    User,

    // Mutations
    Mutation: {
        ...AuthMutation,
        ...UserMutation,
        ...PostMutation,
        ...CommentMutation,
        ...CategoryMutation,
    },
}

export default resolvers
