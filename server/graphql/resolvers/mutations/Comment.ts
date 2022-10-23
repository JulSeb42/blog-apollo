/*=============================================== Comment mutation ===============================================*/

export const CommentMutation = {
    newComment: async (
        _: any,
        { newCommentInput: { post, poster, body } }: any,
        { newComment }: any
    ) => await newComment({ post, poster, body }),
}