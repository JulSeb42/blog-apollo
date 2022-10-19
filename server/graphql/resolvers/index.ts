/*=============================================== Resolvers ===============================================*/

import { Query, Post, Category, User } from "./queries"
import { AuthMutation, UserMutation, PostMutation } from "./mutations"

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
    },
}

export default resolvers
