/*=============================================== Comment type ===============================================*/

import { PostType } from "./"

export type CommentType = {
    _id: string
    poster: string
    body: string
    post: PostType
    date: string
    time: string
}
