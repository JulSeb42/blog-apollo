/*=============================================== Dashboard ===============================================*/

import React, { useContext, useState } from "react"
import { Text, Flexbox, Button, Grid } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import PageDashboard from "../../components/dashboard/PageDashboard"
import CardAuthor from "../../components/author/CardAuthor"
import ErrorPage from "../../components/layouts/ErrorPage"
import Pagination from "../../components/Pagination"
import PostLine from "../../components/dashboard/PostLine"

import { POSTS_DASHBOARD } from "../../graphql/queries"
import { PostType } from "../../types"
import { dataLimit, pageLimit } from "../../config/pagination.config"

const Dashboard = () => {
    const { user } = useContext(AuthContext) as AuthContextType

    const { data, loading, error } = useQuery(POSTS_DASHBOARD)

    const posts: PostType[] = data?.posts
    const length = posts?.length

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return posts?.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(length / dataLimit)

    if (error) return <ErrorPage error={error.message} />

    return user ? (
        <PageDashboard title="Dashboard" isLoading={loading}>
            <CardAuthor author={user} dashboard />

            <Flexbox justifyContent="space-between">
                <Text tag="h2">
                    Posts ({length} post{length > 1 ? "s" : ""})
                </Text>

                <Button to="/dashboard/posts/new-post">New post</Button>
            </Flexbox>

            <Grid col={3}>
                {/* Search by title */}
                {/* Filter by author */}
                {/* Filter by status */}
            </Grid>

            <Grid gap="s">
                {getPaginatedData()?.map((post: PostType, i: number) => (
                    <PostLine
                        post={post}
                        noBorder={i === getPaginatedData().length - 1}
                        key={post._id}
                    />
                ))}
            </Grid>

            {numberOfPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={numberOfPages}
                    pageLimit={pageLimit}
                />
            )}
        </PageDashboard>
    ) : (
        <div />
    )
}

export default Dashboard
