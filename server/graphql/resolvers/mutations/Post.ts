/*=============================================== Post mutations ===============================================*/

const PostMutation = {
    newPost: async (_: any, { newPostInput }: any, { newPost }: any) =>
        await newPost(newPostInput),
}

export { PostMutation }
