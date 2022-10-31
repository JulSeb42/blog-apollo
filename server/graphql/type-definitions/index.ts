/*=============================================== TypeDefs ===============================================*/

import { EnumRoles } from "./enum/user-roles"

import { AuthInputs } from "./inputs/auth"
import { CategoryInputs } from "./inputs/category"
import { CommentInputs } from "./inputs/comment"
import { GlobalInputs } from "./inputs/global"
import { PageInputs } from "./inputs/page"
import { PostInputs } from "./inputs/post"
import { UserInputs } from "./inputs/user"
import { ContactInput } from "./inputs/contact"

import { CategoryType } from "./types/category"
import { CommentType } from "./types/comment"
import { GlobalType } from "./types/global"
import { MutationType } from "./types/mutation"
import { PageType } from "./types/page"
import { PostType } from "./types/post"
import { QueryType } from "./types/query"
import { UserType } from "./types/user"

const typeDefs: any = [
    EnumRoles,
    AuthInputs,
    CategoryInputs,
    CommentInputs,
    GlobalInputs,
    PageInputs,
    PostInputs,
    UserInputs,
    ContactInput,
    CategoryType,
    CommentType,
    GlobalType,
    MutationType,
    PageType,
    PostType,
    QueryType,
    UserType,
]

export default typeDefs
