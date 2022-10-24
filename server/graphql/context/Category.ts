/*=============================================== Category context ===============================================*/

import { ApolloError } from "apollo-server"

import Category from "../../models/Category.model"
import { CategoryType } from "../../types"

const CategoryContext = {
    categories: async () => await Category.find(),
    category: async ({ name }: CategoryType) => Category.findOne({ name }),
    categoryById: async ({ _id }: CategoryType) => Category.findById(_id),

    newCategory: async ({ name }: CategoryType) => {
        const foundCategory = await Category.findOne({ name })

        if (!foundCategory) {
            const newCategory = await Category.create({ name })

            return newCategory.save()
        } else {
            throw new ApolloError(
                "This category already exists",
                "CATEGORY_EXISTS"
            )
        }
    },

    updateCategory: async ({ _id, name }: CategoryType) => {
        const foundCategory = await Category.findById(_id)

        if (foundCategory) {
            const updatedCategory = await Category.findByIdAndUpdate(
                _id,
                { name },
                { new: true }
            )

            return updatedCategory?.save()
        } else {
            throw new ApolloError(
                "This category does not exist.",
                "CATEGORY_DOES_NOT_EXIST"
            )
        }
    },

    deleteCategory: async ({ _id }: CategoryType) => {
        await Category.findByIdAndDelete(_id)
        return `Category ${_id} has been deleted.`
    },
}

export { CategoryContext }
