/*=============================================== Contact mutation ===============================================*/

import sendMail from "../../../utils/send-mail"
import Global from "../../../models/Global.model"

export const ContactMutation = {
    contact: async (
        _: any,
        { contactInput: { name, email, subject, message } }: any,
        __: any
    ) => {
        const global = await Global.find()
        const appEmail = global[0]?.email

        sendMail(
            appEmail || "",
            `New message from ${name} on ${global[0]?.name}: ${subject}`,
            `Hello,<br />You have received a new message from ${email} on ${global[0]?.name} with the subject: ${subject}. This is their message:<br />${message}`
        )

        return `Message sent to ${appEmail}!`
    },

    editContact: async (
        _: any,
        { contactPageInput }: any,
        { editContact }: any
    ) => {
        console.log("Hello")
        return await editContact(contactPageInput)
    },

    showContact: async (
        _: any,
        { showContactInput }: any,
        { showContact }: any
    ) => await showContact(showContactInput),
}
