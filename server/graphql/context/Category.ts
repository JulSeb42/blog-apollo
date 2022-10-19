/*=============================================== Category context ===============================================*/

import Category from "../../models/Category.model"
import { CategoryType } from "../../types"

const CategoryContext = {
    categories: async () => await Category.find(),
    category: async ({ _id }: CategoryType) => Category.findById(_id),

    newCategory: async ({ name }: CategoryType) => {},
}

export { CategoryContext }
