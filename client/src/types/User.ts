/*=============================================== User type ===============================================*/

import { PostType } from "."

export type UserType = {
    _id: string
    fullName: string
    email: string
    password: string
    generatedPassword: string
    resetToken?: string
    token: string
    bio: string
    imageUrl: string
    role: "admin" | "writer" | "moderator"
    approved: boolean
    featured: boolean
    posts: PostType[]
    exp?: string | number
}
