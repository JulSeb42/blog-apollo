/*=============================================== Global query ===============================================*/

export const GlobalQuery = {
    globalData: async (_: any, __: any, { globalData }: any) =>
        await globalData(),
}
