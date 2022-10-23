/*=============================================== PostDetail ===============================================*/

import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { unslugifyAuthor, slugify } from "../../utils"
import {
    Breadcrumbs,
    ComponentProps,
    MarkdownContainer,
    OptionsMarkdown,
    Section,
    Text,
    Grid,
} from "tsx-library-julseb"

import FullPage from "../../components/layouts/FullPage"
import ErrorPage from "../../components/layouts/ErrorPage"
import CardAuthor from "../../components/author/CardAuthor"
import CardComment from "../../components/comments/CardComment"
import AddComment from "../../components/comments/AddComment"

import { GET_POST } from "../../graphql/queries"
import { PostType } from "../../types"

const PostDetail = () => {
    const { slug } = useParams()
    const title = slug ? unslugifyAuthor(slug) : "Post"

    const { data, loading, error } = useQuery(GET_POST, {
        variables: {
            slug,
        },
    })

    const post: PostType = data?.post

    const breadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Home",
            to: "/",
        },
        {
            text: "Posts",
            to: "/posts",
        },
        {
            text: post ? unslugifyAuthor(post?.category.name) : "Post",
            to: post
                ? `/categories/${slugify(post?.category.name)}`
                : "Category",
        },
        {
            text: title,
        },
    ]

    if (error) return <ErrorPage error={error?.message || ""} />

    return (
        <FullPage title={title} cover={post?.imageUrl} isLoading={loading}>
            <Breadcrumbs items={breadcrumbs} separator="icon" />

            <MarkdownContainer
                content={post?.body}
                options={{ ...OptionsMarkdown, wrapper: "article" }}
            />

            <CardAuthor author={post?.author} profile />

            <Section>
                <Text tag="h2">Comments</Text>

                {post?.comments?.length > 0 ? (
                    <Grid gap="s">
                        {post?.comments?.map(comment => (
                            <CardComment comment={comment} key={comment._id} />
                        ))}
                    </Grid>
                ) : (
                    <Text>No comment yet.</Text>
                )}

                <AddComment post={post} />
            </Section>
        </FullPage>
    )
}

export default PostDetail
