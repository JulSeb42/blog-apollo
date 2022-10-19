/*=============================================== Post queries ===============================================*/

const Post = {
    category: async (
        { category: categoryId }: any,
        _: any,
        { category }: any
    ) => category(categoryId),

    author: async ({ author }: any, _: any, { user }: any) =>
        await user(author),
}

export { Post }
