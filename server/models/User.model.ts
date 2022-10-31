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
        resetToken: String,
        generatedPassword: String,

        role: {
            type: String,
            enum: ["admin", "writer", "moderator"],
        },

        approved: Boolean,
        featured: Boolean,
    },
    { timestamps: true }
)

const User = model("User", userSchema)

export default User
