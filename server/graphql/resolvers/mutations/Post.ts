/*=============================================== Post mutations ===============================================*/

const PostMutation = {
    newPost: async (_: any, { newPostInput }: any, { newPost }: any) =>
        await newPost(newPostInput),
    editPost: async (_: any, { editPostInput }: any, { editPost }: any) =>
        await editPost(editPostInput),
    deletePost: async (_: any, { _id }: any, { deletePost }: any) =>
        await deletePost({ _id }),
}

export { PostMutation }
