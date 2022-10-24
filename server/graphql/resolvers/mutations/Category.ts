/*=============================================== Category mutations ===============================================*/

export const CategoryMutation = {
    newCategory: async (
        _: any,
        { newCategoryInput }: any,
        { newCategory }: any
    ) => await newCategory(newCategoryInput),

    updateCategory: async (
        _: any,
        { updateCategoryInput }: any,
        { updateCategory }: any
    ) => await updateCategory(updateCategoryInput),

    deleteCategory: async (_: any, { _id }: any, { deleteCategory }: any) =>
        await deleteCategory({ _id }),
}
