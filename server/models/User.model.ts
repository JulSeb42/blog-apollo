/*=============================================== User model ===============================================*/

import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        bio: String,
        imageUrl: String,
        password: String,
        verified: Boolean,
        verifyToken: String,
        resetToken: String,

        role: {
            type: String,
            enum: ["admin", "writer", "moderator"],
        },

        approved: Boolean,
        featured: Boolean,

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    { timestamps: true }
)

const User = model("User", userSchema)

export default User
