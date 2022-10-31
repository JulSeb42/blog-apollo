/*=============================================== Category query ===============================================*/

import { ApolloError } from "apollo-server"

export const CategoryQuery = {
    categories: async (_: any, __: any, { categories }: any) => {
        let categoriesArr = await categories()

        let sortedCategories = categoriesArr.sort((a: any, b: any) =>
            a.name < b.name ? -1 : 1
        )

        return sortedCategories
    },
    category: async (_: any, { name }: any, { category }: any) =>
        await category({ name }),
    categoryById: async (_: any, { _id }: any, { categoryById }: any) =>
        await categoryById({ _id }),
}