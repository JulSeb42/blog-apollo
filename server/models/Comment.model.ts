/*=============================================== Comment model ===============================================*/

import { Schema, model } from "mongoose"

const commentSchema = new Schema(
    {
        poster: {
            type: String,
            required: true,
        },

        body: {
            type: String,
            required: true,
        },

        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },

        date: String,
        time: String,
        dateEdit: String,
        timeEdit: String,
        editedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
)

const Comment = model("Comment", commentSchema)

export default Comment
