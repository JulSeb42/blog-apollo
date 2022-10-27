/*=============================================== Page context ===============================================*/

import Page from "../../models/Page.model"
import { PageType } from "../../types"

export const PageContext = {
    pages: async () => await Page.find(),
    page: async ({ slug }: any) => await Page.findOne({ slug }),
    pageById: async ({ _id }: any) => await Page.findById(_id),
}
