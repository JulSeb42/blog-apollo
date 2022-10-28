/*=============================================== Global mutation ===============================================*/

export const GlobalMutation = {
    editGlobal: async (_: any, { globalInput }: any, { editGlobal }: any) =>
        await editGlobal(globalInput),
}
