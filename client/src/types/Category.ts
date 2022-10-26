/*=============================================== Category type ===============================================*/

import { PostType } from "./"

export type CategoryType = {
    _id: string
    name: string
    posts: PostType[]
}
