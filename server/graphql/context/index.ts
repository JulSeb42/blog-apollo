/*=============================================== Context ===============================================*/

import { UserContext } from "./User"
import { AuthContext } from "./Auth"
import { PostContext } from "./Post"
import { CategoryContext } from "./Category"
import { CommentContext } from "./Comment"
import { PageContext } from "./Page"

const context = {
    ...AuthContext,
    ...UserContext,
    ...PostContext,
    ...CategoryContext,
    ...CommentContext,
    ...PageContext,
}

export default context
