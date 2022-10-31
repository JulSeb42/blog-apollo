/*=============================================== Comment query ===============================================*/

export const CommentQuery = {
    comments: async (_: any, __: any, { comments }: any) => {
        let commentsArr = await comments()

        let sortedComments = commentsArr.sort((a: any, b: any) => {
            if (a.date === b.date) {
                return b.time.localeCompare(a.time)
            }

            return new Date(a.date) > new Date(b.date) ? -1 : 9
        })

        return sortedComments
    },
    comment: async (_: any, { _id }: any, { comment }: any) =>
        await comment({ _id }),
}
