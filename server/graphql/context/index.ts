/*=============================================== Context ===============================================*/

import { UserContext } from "./User"
import { AuthContext } from "./Auth"
import { PostContext } from "./Post"
import { CategoryContext } from "./Category"

const context = {
    ...AuthContext,
    ...UserContext,
    ...PostContext,
    ...CategoryContext,
}

export default context
