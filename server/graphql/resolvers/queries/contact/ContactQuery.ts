/*=============================================== Contact query ===============================================*/

export const ContactQuery = {
    contactPage: async (_: any, __: any, { contactPage }: any) =>
        await contactPage(),
}
