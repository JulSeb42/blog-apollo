/*=============================================== Page context ===============================================*/

import { ApolloError } from "apollo-server"

import Page from "../../models/Page.model"
import { PageType } from "../../types"

export const PageContext = {
    pages: async () => await Page.find(),
    page: async ({ slug }: any) => await Page.findOne({ slug }),
    pageById: async ({ _id }: any) => await Page.findById(_id),

    newPage: async ({
        title,
        slug,
        body,
        metaDescription,
        keywords,
        draft,
    }: PageType) => {
        if (!title) {
            throw new ApolloError("The title is required", "TITLE_REQUIRED")
        }

        if (!slug) {
            throw new ApolloError("The slug is required", "SLUG_REQUIRED")
        }

        if (!body) {
            throw new ApolloError("The body is required", "BODY_REQUIRED")
        }

        if (!metaDescription) {
            throw new ApolloError(
                "The meta description is required",
                "META_DESCRIPTION_REQUIRED"
            )
        }

        const foundPage = await Page.findOne({ slug })

        if (!foundPage) {
            const newPage = new Page({
                title,
                slug,
                body,
                metaDescription,
                keywords,
                draft,
            })

            return newPage.save()
        } else {
            throw new ApolloError(
                "This slug already exists, it must be unique",
                "SLUG_UNIQUE"
            )
        }
    },
}
