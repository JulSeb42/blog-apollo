/*=============================================== Page mutation ===============================================*/

export const PageMutation = {
    newPage: async (_: any, { newPageInput }: any, { newPage }: any) =>
        newPage(newPageInput),
}
