/*=============================================== User query ===============================================*/

export const UserQuery = {
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
    user: async (_: any, { fullName }: any, { user }: any) =>
        await user({ fullName }),
    userById: async (_: any, { _id }: any, { userById }: any) =>
        await userById({ _id }),
    userByToken: async (_: any, { token }: any, { getUserByToken }: any) =>
        await getUserByToken({ token }),
}