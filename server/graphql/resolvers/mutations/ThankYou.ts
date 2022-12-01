/*=============================================== Thank you mutations ===============================================*/

export const ThankYouMutation = {
    editThankYou: async (
        _: any,
        { thankYouInput }: any,
        { editThankYou }: any
    ) => await editThankYou(thankYouInput),
}
