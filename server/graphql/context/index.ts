/*=============================================== Context ===============================================*/

import { UserContext } from "./User"
import { AuthContext } from "./Auth"
import { PostContext } from "./Post"
import { CategoryContext } from "./Category"
import { CommentContext } from "./Comment"
import { PageContext } from "./Page"
import { GlobalContext } from "./GlobalData"
import { SetupContext } from "./Setup"
import { ContactContext } from "./Contact"
import { ThankYouContext } from "./ThankYou"

const context = {
    ...AuthContext,
    ...UserContext,
    ...PostContext,
    ...CategoryContext,
    ...CommentContext,
    ...PageContext,
    ...GlobalContext,
    ...SetupContext,
    ...ContactContext,
    ...ThankYouContext,
}

export default context
