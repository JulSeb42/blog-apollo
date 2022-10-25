/*=============================================== Queries ===============================================*/

import { ApolloError } from "apollo-server"
import { PostType } from "../../../types"

const Query = {
    users: async (_: any, { filters }: any, { users }: any) => {
        let usersArr = await users()

        let sortedUsers = usersArr.sort((a: any, b: any) =>
            a.fullName < b.fullName ? -1 : 0
        )

        if (filters) {
            const { featured } = filters

            if (featured) {
                sortedUsers = sortedUsers.filter((user: any) => user.featured)
            }
        }

        return sortedUsers
    },
    user: async (_: any, { fullName }: any, { user }: any) =>
        await user({ fullName }),
    userById: async (_: any, { _id }: any, { userById }: any) =>
        await userById({ _id }),
    userByToken: async (_: any, { token }: any, { getUserByToken }: any) =>
        await getUserByToken({ token }),

    posts: async (_: any, { filters }: any, { posts }: any) => {
        let postsArr: PostType[] = await posts()

        let sorted = postsArr.sort((a: any, b: any) => {
            if (a.date === b.date) {
                return b.time.localeCompare(a.time)
            }

            // @ts-expect-error
            return new Date(b.date) - new Date(a.date)
        })

        if (filters) {
            const { featured, draft } = filters

            if (featured) {
                sorted = sorted
                    .filter((post: any) => post.featured === true)
                    .filter((post: any) => post.draft === false)
            }

            if (draft === false) {
                sorted = sorted.filter(post => post.draft === false)
            }
        }

        return sorted
    },
    post: async (_: any, { slug }: any, { post }: any) => {
        const foundPost = await post({ slug })

        if (foundPost) {
            return foundPost
        } else {
            throw new ApolloError("Post not found", "POST_NOT_FOUND")
        }
    },
    postById: async (_: any, { _id }: any, { postById }: any) =>
        await postById({ _id }),

    categories: async (_: any, __: any, { categories }: any) => {
        let categoriesArr = await categories()

        let sortedCategories = categoriesArr.sort((a: any, b: any) =>
            a.name < b.name ? -1 : 1
        )

        return sortedCategories
    },
    category: async (_: any, { name }: any, { category }: any) =>
        await category({ name }),
    categoryById: async (_: any, { _id }: any, { categoryById }: any) =>
        await categoryById({ _id }),

    comments: async (_: any, __: any, { comments }: any) => {
        let commentsArr = await comments()

        let sortedComments = commentsArr.sort((a: any, b: any) => {
            if (a.date === b.date) {
                return new Date(b.time).getTime() - new Date(a.time).getTime()
            }

            // @ts-expect-error
            return new Date(b.date) - new Date(a.date)
        })

        return sortedComments
    },
    comment: async (_: any, { _id }: any, { comment }: any) =>
        await comment({ _id }),
}

export { Query }
