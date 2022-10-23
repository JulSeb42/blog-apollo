/*=============================================== Homepage ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"

import FullPage from "../components/layouts/FullPage"
import ErrorPage from "../components/layouts/ErrorPage"
import ListPosts from "../components/posts/ListPosts"

import { ALL_POSTS } from "../graphql/queries"

import { PostType } from "../types"

const Homepage = () => {
    const { data, error, loading } = useQuery(ALL_POSTS)
    const posts: PostType[] = data?.posts.slice(0, 10)

    if (error) return <ErrorPage error={error.message} />

    return (
        <FullPage
            title="Homepage"
            cover="https://res.cloudinary.com/dyfxmafvr/image/upload/v1648719726/blog-new/brtgxjfi96rvxbzpjqw0.jpg"
            isHomepage
            isLoading={loading}
        >
            <ListPosts data={posts} pagination={false} />
        </FullPage>
    )
}

export default Homepage
