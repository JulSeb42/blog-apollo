/*=============================================== Post queries ===============================================*/

import Comment from "../../../models/Comment.model"

const Post = {
    category: async ({ category }: any, _: any, { categoryById }: any) =>
        categoryById(category),

    author: async ({ author }: any, _: any, { userById }: any) =>
        await userById(author),

    comments: async ({ _id }: any, _: any, { getPostComments }: any) =>
        await getPostComments({ postId: _id }),
}

export { Post }
