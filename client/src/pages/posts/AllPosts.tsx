/*=============================================== AllPosts ===============================================*/

import React from "react"
import { ComponentProps } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"

import Page from "../../components/layouts/Page"
import ErrorPage from "../../components/layouts/ErrorPage"
import ListPosts from "../../components/posts/ListPosts"

import { ALL_POSTS } from "../../graphql/queries"
import { PostType } from "../../types"

const AllPosts = () => {
    const breadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Posts",
        },
    ]

    const { data, loading, error } = useQuery(ALL_POSTS)
    const posts: PostType[] = data?.posts

    if (error) return <ErrorPage error={error.message} />

    return (
        <Page
            title="Posts"
            aside={{ categories: true, authors: true }}
            breadcrumbs={breadcrumbs}
            isLoading={loading}
        >
            <ListPosts data={posts} />
        </Page>
    )
}

export default AllPosts
