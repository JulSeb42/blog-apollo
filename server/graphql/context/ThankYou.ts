/*=============================================== Thank you context ===============================================*/

import { ApolloError } from "apollo-server"

import ThankYou from "../../models/ThankYou.model"
import { ThankYouType } from "../../types"

export const ThankYouContext = {
    thankYouPage: async () => {
        const thankYouArr = await ThankYou.find()
        return thankYouArr[0]
    },

    editThankYou: async ({ _id, title, body }: ThankYouType) => {
        if (!title) {
            throw new ApolloError("Title is required", "TITLE_REQUIRED")
        }

        if (!body) {
            throw new ApolloError("Body is required", "BODY_REQUIRED")
        }

        const found = await ThankYou.findById(_id)

        if (found) {
            const editedPage = await ThankYou.findByIdAndUpdate(
                _id,
                { title, body },
                { new: true }
            )

            return editedPage?.save()
        } else {
            throw new ApolloError("Data is not found", "DATA_NOT_FOUND")
        }
    },
}
