/*=============================================== Post model ===============================================*/

import { Schema, model } from "mongoose"

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        date: String,
        time: String,
        dateEdited: String,
        timeEdited: String,
        draft: Boolean,
        body: String,
        metaDescription: String,
        featured: Boolean,
        imageUrl: String,
        tags: Array,

        slug: {
            type: String,
            unique: true,
        },

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
)

const Post = model("Post", postSchema)

export default Post
