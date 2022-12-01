/*=============================================== Thank you query ===============================================*/

export const ThankYouQuery = {
    thankYouPage: async (_: any, __: any, { thankYouPage }: any) =>
        await thankYouPage(),
}
