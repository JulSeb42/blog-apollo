/*=============================================== Comments ===============================================*/

import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { Text, Grid } from "tsx-library-julseb"
import { useSearchParams } from "react-router-dom"

import PageDashboard from "../../components/dashboard/PageDashboard"
import ErrorPage from "../../components/layouts/ErrorPage"
import CommentLine from "../../components/dashboard/CommentLine"
import Pagination from "../../components/Pagination"

import { ALL_COMMENTS } from "../../graphql/queries"
import { CommentType } from "../../types"

import { dataLimit, pageLimit } from "../../config/pagination.config"

const Comments = () => {
    const { data, loading, error } = useQuery(ALL_COMMENTS)
    const comments: CommentType[] = data?.comments

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return comments?.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(comments?.length / dataLimit)

    if (error) return <ErrorPage error={error.message} />

    return (
        <PageDashboard title="Comments" isLoading={loading}>
            <Text tag="h1">All comments</Text>

            <Grid col={2} gap="s">
                {/* Search by post, name or content */}
                {/* Sort */}
            </Grid>

            <Grid gap="s">
                {getPaginatedData()?.map(comment => (
                    <CommentLine comment={comment} key={comment._id} />
                ))}

                {numberOfPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={numberOfPages}
                        pageLimit={pageLimit}
                    />
                )}
            </Grid>
        </PageDashboard>
    )
}

export default Comments
