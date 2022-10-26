/*=============================================== Comment mutation ===============================================*/

export const CommentMutation = {
    newComment: async (
        _: any,
        { newCommentInput: { post, poster, body } }: any,
        { newComment }: any
    ) => await newComment({ post, poster, body }),

    deleteComment: async (_: any, { _id }: any, { deleteComment }: any) =>
        await deleteComment({ _id }),
}
