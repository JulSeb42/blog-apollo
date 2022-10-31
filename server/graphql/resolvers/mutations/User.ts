/*=============================================== User mutations ===============================================*/

const UserMutation = {
    addUser: async (_: any, { addUserInput }: any, { addUser }: any) =>
        await addUser(addUserInput),

    editUser: async (_: any, { editUserInput }: any, { editUser }: any) =>
        await editUser(editUserInput),

    editPassword: async (
        _: any,
        { editPasswordInput }: any,
        { editPassword }: any
    ) => editPassword(editPasswordInput),

    deleteUser: async (_: any, { _id }: any, { deleteUser }: any) =>
        deleteUser({ _id }),

    setUserRole: async (
        _: any,
        { setUserRoleInput }: any,
        { setUserRole }: any
    ) => setUserRole(setUserRoleInput),

    featureUser: async (
        _: any,
        { featureUserInput }: any,
        { featureUser }: any
    ) => featureUser(featureUserInput),

    approveUser: async (
        _: any,
        { approveUserInput }: any,
        { approveUser }: any
    ) => approveUser(approveUserInput),
}

export { UserMutation }
