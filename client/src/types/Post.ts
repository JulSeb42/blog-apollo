/*=============================================== Post type ===============================================*/

import { CategoryType, UserType, CommentType } from "./"

export type PostType = {
    _id: string
    title: string
    date: string
    time: string
    dateEdited: string
    timeEdited: string
    tags: string[]
    draft: boolean
    body: string
    metaDescription: string
    featured: boolean
    imageUrl: string
    slug: string
    category: CategoryType
    author: UserType
    comments: CommentType[]
}
