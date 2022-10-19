/*=============================================== Category queries ===============================================*/

const Category = {
    posts: async ({ _id }: any, _: any, { categoryPosts }: any) =>
        await categoryPosts({ _id }),
}

export { Category }
