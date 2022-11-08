/*=============================================== Setup mutation ===============================================*/

export const SetupMutation = {
    createFirstAccount: async (
        _: any,
        { firstUserInput }: any,
        { createFirstAccount }: any
    ) => await createFirstAccount(firstUserInput),

    createGlobal: async (
        _: any,
        { createGlobalInput }: any,
        { createGlobal }: any
    ) => await createGlobal(createGlobalInput),

    setupGlobal: async (_: any, { _id }: any, { setupGlobal }: any) =>
        setupGlobal({ _id }),
}
