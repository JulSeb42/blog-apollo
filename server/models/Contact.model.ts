/*=============================================== Contact model ===============================================*/

import { Schema, model } from "mongoose"

const contactSchema = new Schema(
    {
        title: String,
        body: String,
        hideContact: Boolean,
        showForm: Boolean,

        labelName: String,
        labelEmail: String,
        labelSubject: String,
        labelMessage: String,
        labelButton: String,

        header: Boolean,
        orderHeader: Number,
        footer: Boolean,
        orderFooter: Number,
    },
    { timestamps: true }
)

const Contact = model("Contact", contactSchema)

export default Contact
