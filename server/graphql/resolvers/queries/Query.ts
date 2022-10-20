/*=============================================== Queries ===============================================*/

const Query = {
    users: async (_: any, { filters }: any, { users }: any) => {
        let usersArr = await users()

        let sortedUsers = usersArr.sort((a: any, b: any) =>
            a.fullName < b.fullName ? -1 : 0
        )

        if (filters) {
            const { featured } = filters

            if (featured) {
                sortedUsers = sortedUsers.filter((user: any) => user.featured)
            }
        }

        return sortedUsers
    },
    user: async (_: any, { _id }: any, { user }: any) => await user({ _id }),

    posts: async (_: any, { filters }: any, { posts }: any) => {
        let postsArr = await posts()

        let sorted = postsArr.sort((a: any, b: any) => {
            if (a.date === b.date) {
                return new Date(b.time).getTime() - new Date(a.time).getTime()
            }

            // @ts-expect-error
            return new Date(b.date) - new Date(a.date)
        })

        if (filters) {
            const { featured } = filters

            if (featured) {
                sorted = sorted.filter((post: any) => post.featured === true)
            }
        }

        return sorted
    },
    post: async (_: any, { _id }: any, { post }: any) => await post({ _id }),

    categories: async (_: any, __: any, { categories }: any) => {
        let categoriesArr = await categories()

        let sortedCategories = categoriesArr.sort((a: any, b: any) =>
            a.name < b.name ? -1 : 1
        )

        return sortedCategories
    },
    category: async (_: any, { _id }: any, { category }: any) =>
        await category({ _id }),
}

export { Query }
