/*=============================================== AllPosts ===============================================*/

import React from "react"
import { ComponentProps } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"

import Page from "../../components/layouts/Page"
import ListPosts from "../../components/posts/ListPosts"

import { PUBLISHED_POSTS } from "../../graphql/queries"
import { PostType } from "../../types"

const AllPosts = () => {
    const breadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Posts",
        },
    ]

    const { data, loading, error } = useQuery(PUBLISHED_POSTS)
    const posts: PostType[] = data?.posts

    return (
        <Page
            title="Posts"
            aside={{ categories: true, authors: true }}
            breadcrumbs={breadcrumbs}
            isLoading={loading}
            error={error?.message}
        >
            <ListPosts data={posts} />
        </Page>
    )
}

export default AllPosts
