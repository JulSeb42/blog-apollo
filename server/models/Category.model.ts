/*=============================================== Category model ===============================================*/

import { Schema, model } from "mongoose"

const categorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
)

const Category = model("Category", categorySchema)

export default Category
