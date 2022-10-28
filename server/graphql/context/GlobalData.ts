/*=============================================== Global data context ===============================================*/

import { ApolloError } from "apollo-server"

import Global from "../../models/Global.model"
import { GlobalType } from "../../types"

export const GlobalContext = {
    globalData: async () => {
        const globalArr = await Global.find()
        return globalArr[0]
    },

    editGlobal: async ({
        _id,
        name,
        baseline,
        metaDescription,
        favicon,
        email,
        cover,
        keywords,
        language,
    }: GlobalType) => {
        if (!name) {
            throw new ApolloError("Name is required", "NAME_REQUIRED")
        }

        if (!email) {
            throw new ApolloError("Email is required", "EMAIL_REQUIRED")
        }

        if (!language) {
            throw new ApolloError("Language is required", "LANGUAGE_REQUIRED")
        }

        const foundGlobal = await Global.findById(_id)

        if (foundGlobal) {
            const editedGlobal = await Global.findByIdAndUpdate(
                _id,
                {
                    name,
                    baseline,
                    metaDescription,
                    favicon,
                    email,
                    cover,
                    keywords,
                    language,
                },
                { new: true }
            )

            return editedGlobal?.save()
        } else {
            throw new ApolloError("Data is not found", "DATA_NOT_FOUND")
        }
    },
}
