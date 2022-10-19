/*=============================================== Queries ===============================================*/

const Query = {
    users: async (_: any, __: any, { users }: any) => await users(),
    user: async (_: any, { _id }: any, { user }: any) => await user({ _id }),

    posts: async (_: any, __: any, { posts }: any) => await posts(),
    post: async (_: any, { _id }: any, { post }: any) => await post({ _id }),

    categories: async (_: any, __: any, { categories }: any) =>
        await categories(),
    category: async (_: any, { _id }: any, { category }: any) =>
        await category({ _id }),
}

export { Query }
