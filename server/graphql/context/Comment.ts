/*=============================================== Comment context ===============================================*/

import { ApolloError } from "apollo-server"

import Comment from "../../models/Comment.model"
import { CommentType } from "../../types"
import { getToday, getTimeNow } from "ts-utils-julseb"

export const CommentContext = {
    comments: async () => await Comment.find(),
    comment: async ({ _id }: CommentType) => await Comment.findById(_id),
    getPostComments: async ({ postId }: any) => await Comment.find({ post: postId }),

    newComment: async ({ post, poster, body }: CommentType) => {
        if (!poster) {
            throw new ApolloError("Your name is required.", "NAME_REQUIRED")
        }

        if (!body) {
            throw new ApolloError(
                "The message is required.",
                "MESSAGE_REQUIRED"
            )
        }

        const newComment = new Comment({
            poster,
            post,
            body,
            date: getToday(),
            time: getTimeNow(),
        })

        return newComment.save()
    },
}
