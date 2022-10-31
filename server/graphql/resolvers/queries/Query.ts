/*=============================================== Queries ===============================================*/

import { ApolloError } from "apollo-server"
import { PostType, PageType } from "../../../types"

import { UserQuery } from "./user/UserQuery"
import { CategoryQuery } from "./category/CategoryQuery"
import { PostQuery } from "./post/PostQuery"
import { CommentQuery } from "./comment/CommentQuery"
import { PageQuery } from "./page/PageQuery"
import { GlobalQuery } from "./global/GlobalQuery"

const Query = {
    ...UserQuery,
    ...PostQuery,
    ...CategoryQuery,
    ...CommentQuery,
    ...PageQuery,
    ...GlobalQuery,
}

export { Query }
