/*=============================================== Contact context ===============================================*/

import { ApolloError } from "apollo-server"

import Contact from "../../models/Contact.model"
import { ContactPagesType } from "../../types"

export const ContactContext = {
    contactPage: async () => {
        const contactArr = await Contact.find()
        return contactArr[0]
    },

    editContact: async ({
        _id,
        title,
        hideContact,
        body,
        showForm,
        labelName,
        labelEmail,
        labelSubject,
        labelMessage,
        labelButton,
    }: ContactPagesType) => {
        if (!hideContact && !title) {
            throw new ApolloError("Title is required", "TITLE_REQUIRED")
        }

        if (!hideContact && !body) {
            throw new ApolloError("Body is required", "BODY_REQUIRED")
        }

        if (!hideContact && showForm && !labelName) {
            throw new ApolloError(
                "Name label is required",
                "TITLE_LABEL_REQUIRED"
            )
        }

        if (!hideContact && showForm && !labelEmail) {
            throw new ApolloError(
                "Email label is required",
                "EMAIL_LABEL_REQUIRED"
            )
        }

        if (!hideContact && showForm && !labelSubject) {
            throw new ApolloError(
                "Subject label is required",
                "SUBJECT_LABEL_REQUIRED"
            )
        }

        if (!hideContact && showForm && !labelMessage) {
            throw new ApolloError(
                "Message label is required",
                "MESSAGE_LABEL_REQUIRED"
            )
        }

        if (!hideContact && showForm && !labelButton) {
            throw new ApolloError(
                "Button label is required",
                "BUTTON_LABEL_REQUIRED"
            )
        }

        const foundContact = await Contact.findById(_id)

        if (foundContact) {
            const editedContact = await Contact.findByIdAndUpdate(
                _id,
                {
                    title,
                    hideContact,
                    body,
                    showForm,
                    labelName,
                    labelEmail,
                    labelSubject,
                    labelMessage,
                    labelButton,
                },
                { new: true }
            )

            return editedContact?.save()
        } else {
            throw new ApolloError("Data is not found", "DATA_NOT_FOUND")
        }
    },

    showContact: async ({
        _id,
        header,
        orderHeader,
        footer,
        orderFooter,
    }: ContactPagesType) => {
        const contact = await Contact.findById(_id)

        if (contact) {
            const editedContact = await Contact.findByIdAndUpdate(
                _id,
                { header, orderHeader, footer, orderFooter },
                { new: true }
            )

            return editedContact?.save()
        } else {
            throw new ApolloError("Contact page not found", "PAGE_NOT_FOUND")
        }
    },
}
