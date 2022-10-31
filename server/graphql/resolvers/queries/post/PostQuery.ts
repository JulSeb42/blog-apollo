/*=============================================== Post query ===============================================*/

import { ApolloError } from "apollo-server"
import { PostType } from "../../../../types"

export const PostQuery = {
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
    post: async (_: any, { slug }: any, { post }: any) => await post({ slug }),
    postById: async (_: any, { _id }: any, { postById }: any) =>
        await postById({ _id }),
}
