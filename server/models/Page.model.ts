/*=============================================== Page model ===============================================*/

import { Schema, model } from "mongoose"

const pageSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        body: String,
        metaDescription: String,
        keywords: Array,
        draft: Boolean,
        header: Boolean,
        orderHeader: Number,
        footer: Boolean,
        orderFooter: Number,
    },
    {
        timestamps: true,
    }
)

const Page = model("Page", pageSchema)

export default Page
