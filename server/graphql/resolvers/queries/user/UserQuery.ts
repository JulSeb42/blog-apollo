/*=============================================== User query ===============================================*/

import { UserType } from "../../../../types"

export const UserQuery = {
    users: async (_: any, { filters }: any, { users }: any) => {
        let usersArr: UserType[] = await users()

        let sortedUsers = usersArr.sort((a, b) =>
            a.fullName < b.fullName ? -1 : 0
        )

        if (filters) {
            const { featured, role, approved, hasPosts } = filters

            if (featured) {
                sortedUsers = sortedUsers.filter(user => user.featured)
            }

            if (role) {
                sortedUsers = sortedUsers.filter(user => user.role === role)
            }

            if (approved) {
                sortedUsers = sortedUsers.filter(
                    user => user.approved === approved
                )
            }

            if (hasPosts) {
                sortedUsers = sortedUsers.filter(user => user.posts.length > 0)
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
