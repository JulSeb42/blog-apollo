/*=============================================== Post context ===============================================*/

import { ApolloError } from "apollo-server"
import { getToday, getTimeNow, slugify } from "ts-utils-julseb"

import Post from "../../models/Post.model"
import { PostType } from "../../types"

const PostContext = {
    posts: async () => await Post.find(),
    post: async ({ slug }: PostType) => await Post.findOne({ slug }),
    postById: async ({ _id }: PostType) => {
        return await Post.findById(_id)
    },

    categoryPosts: async ({ _id }: any) => await Post.find({ category: _id }),
    userPosts: async ({ _id }: any) => await Post.find({ author: _id }),

    newPost: async ({
        title,
        tags,
        draft,
        body,
        metaDescription,
        featured,
        imageUrl,
        slug,
        category,
        author,
    }: PostType) => {
        if (!title) {
            throw new ApolloError("Title is required.", "TITLE_REQUIRED")
        }

        if (!slug) {
            throw new ApolloError("Slug is required.", "SLUG_REQUIRED")
        }

        // @ts-expect-error
        if (!category || category === "none") {
            throw new ApolloError("Category is required.", "CATEGORY_REQUIRED")
        }

        if (!body) {
            throw new ApolloError("Body is required.", "BODY_REQUIRED")
        }

        if (!author) {
            throw new ApolloError("Author not found", "AUTHOR_NOT_FOUND")
        }

        const foundPost = await Post.findOne({ slug })

        if (!foundPost) {
            const newPost = new Post({
                title,
                tags,
                draft,
                body,
                metaDescription,
                featured,
                imageUrl,
                slug: slugify(slug),
                category: category,
                author,

                date: getToday(),
                time: getTimeNow(),
            })

            return await newPost.save()
        } else {
            throw new ApolloError(
                "This slug already exists, it must be unique",
                "SLUG_UNIQUE"
            )
        }
    },

    editPost: async ({
        title,
        tags,
        draft,
        body,
        metaDescription,
        featured,
        imageUrl,
        slug,
        category,
        _id,
    }: PostType) => {
        if (!title) {
            throw new ApolloError("Title is required.", "TITLE_REQUIRED")
        }

        if (!slug) {
            throw new ApolloError("Slug is required.", "SLUG_REQUIRED")
        }

        // @ts-expect-error
        if (!category || category === "none") {
            throw new ApolloError("Category is required.", "CATEGORY_REQUIRED")
        }

        if (!body) {
            throw new ApolloError("Body is required.", "BODY_REQUIRED")
        }

        const foundPost = await Post.findById(_id)

        if (foundPost) {
            const updatedPost = {
                title,
                tags,
                draft,
                body,
                metaDescription,
                featured,
                imageUrl,
                slug,
                category,
            }

            return await Post.findByIdAndUpdate(_id, updatedPost, { new: true })
        } else {
            throw new ApolloError("Post not found.", "POST_NOT_FOUND")
        }
    },

    deletePost: async ({ _id }: any) => {
        await Post.findByIdAndDelete(_id)
        return `Post ${_id} was deleted.`
    },
}

export { PostContext }
