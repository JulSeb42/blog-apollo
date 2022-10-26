/*=============================================== Comment ===============================================*/

export const Comment = {
    post: async ({ post }: any, {}: any, { getPostFromComment }: any) =>
        await getPostFromComment({ postId: post }),
}
