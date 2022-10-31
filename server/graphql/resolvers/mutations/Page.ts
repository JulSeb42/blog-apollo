/*=============================================== Page mutation ===============================================*/

export const PageMutation = {
    newPage: async (_: any, { newPageInput }: any, { newPage }: any) =>
        newPage(newPageInput),
    editPage: async (_: any, { editPageInput }: any, { editPage }: any) =>
        await editPage(editPageInput),
    deletePage: async (_: any, { _id }: any, { deletePage }: any) =>
        await deletePage({ _id }),
    showPage: async (_: any, { showPageInput }: any, { showPage }: any) =>
        await showPage(showPageInput),
}
