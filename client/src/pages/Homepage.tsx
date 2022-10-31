/*=============================================== Homepage ===============================================*/

import React, { useContext } from "react"
import { useQuery } from "@apollo/client"

import { GlobalContext, GlobalContextType } from "../context/global"

import FullPage from "../components/layouts/FullPage"
import ListPosts from "../components/posts/ListPosts"

import { PUBLISHED_POSTS } from "../graphql/queries"

import { PostType } from "../types"

const Homepage = () => {
    const { globalData } = useContext(GlobalContext) as GlobalContextType

    const { data, error, loading } = useQuery(PUBLISHED_POSTS)
    const posts: PostType[] = data?.posts.slice(0, 10)

    return (
        <FullPage
            title="Homepage"
            cover={globalData?.cover || ""}
            isHomepage
            isLoading={loading}
            error={error?.message}
        >
            <ListPosts data={posts} pagination={false} />
        </FullPage>
    )
}

export default Homepage
