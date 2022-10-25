/*=============================================== User mutations ===============================================*/

const UserMutation = {
    editUser: async (_: any, { editUserInput }: any, { editUser }: any) => await editUser(editUserInput),

    editPassword: async (
        _: any,
        { editPasswordInput }: any,
        { editPassword }: any
    ) => editPassword(editPasswordInput),

    deleteUser: async (_: any, { _id }: any, { deleteUser }: any) =>
        deleteUser({ _id }),
}

export { UserMutation }
