/*=============================================== Thank you model ===============================================*/

import { Schema, model } from "mongoose"

const thankYouSchema = new Schema(
    {
        title: String,
        body: String,
    },
    { timestamps: true }
)

const ThankYou = model("ThankYou", thankYouSchema)

export default ThankYou
