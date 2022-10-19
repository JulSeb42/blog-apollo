/*=============================================== User queries ===============================================*/

const User = {
    posts: async ({ _id }: any, _: any, { userPosts }: any) =>
        await userPosts({ _id }),
}

export { User }
