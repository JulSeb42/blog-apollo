/*=============================================== SearchResults ===============================================*/

import React from "react"
import { useSearchParams } from "react-router-dom"
import { Text } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"

import Page from "../components/layouts/Page"
import ListPosts from "../components/posts/ListPosts"

import { ALL_POSTS } from "../graphql/queries"
import { PostType } from "../types"

const SearchResults = () => {
    const [q] = useSearchParams()
    const query = q.get("query")

    const { data, error, loading } = useQuery(ALL_POSTS)

    const posts: PostType[] = data?.posts

    let filteredPosts = posts?.filter(
        post =>
            post.title.toLowerCase().includes(query?.toLowerCase() || "") ||
            post.category.name
                .toLowerCase()
                .includes(query?.toLowerCase() || "") ||
            post.author.fullName
                .toLowerCase()
                .includes(query?.toLowerCase() || "")
    )

    return (
        <Page
            title={`Results for ${query}`}
            isLoading={loading}
            error={error?.message}
        >
            <Text tag="h1">Results for {query}</Text>

            <ListPosts data={filteredPosts} />
        </Page>
    )
}

export default SearchResults
