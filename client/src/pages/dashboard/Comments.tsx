/*=============================================== Comments ===============================================*/

import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { Text, Grid, Input, Button } from "tsx-library-julseb"
import { useSearchParams } from "react-router-dom"

import PageDashboard from "../../components/dashboard/PageDashboard"
import ErrorPage from "../../components/layouts/ErrorPage"
import CommentLine from "../../components/dashboard/CommentLine"
import Pagination from "../../components/Pagination"
import FiltersContainer from "../../components/dashboard/FiltersContainer"

import { ALL_COMMENTS } from "../../graphql/queries"
import { CommentType } from "../../types"

import { dataLimit, pageLimit } from "../../config/pagination.config"

const Comments = () => {
    const { data, loading, error } = useQuery(ALL_COMMENTS)
    const comments: CommentType[] = data?.comments

    const [inputs, setInputs] = useState({
        search: "",
        sort: "desc",
    })

    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleReset = () => setInputs({ search: "", sort: "desc" })

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    let results = comments?.filter(
        comment =>
            comment.body.toLowerCase().includes(inputs.search.toLowerCase()) ||
            comment.poster
                .toLowerCase()
                .includes(inputs.search.toLowerCase()) ||
            comment.post.title
                .toLowerCase()
                .includes(inputs.search.toLowerCase())
    )

    if (inputs.sort === "asc") {
        results = results.sort((a, b) => {
            if (a.date === b.date) {
                return b.time.localeCompare(a.time)
            }

            // @ts-expect-error
            return new Date(b.date) - new Date(a.date)
        })
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results?.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(comments?.length / dataLimit)

    if (error) return <ErrorPage error={error.message} />

    return (
        <PageDashboard title="Comments" isLoading={loading}>
            <Text tag="h1">All comments</Text>

            <FiltersContainer gap="s" alignItems="flex-end">
                <Input
                    id="search"
                    label="Search by post, name or content"
                    value={inputs.search}
                    onChange={handleInputs}
                />
                <Input
                    id="sort"
                    label="Sort"
                    value={inputs.sort}
                    onChange={handleInputs}
                    type="select"
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </Input>

                <Button style={{ height: 32 }} onClick={handleReset}>
                    Reset filters
                </Button>
            </FiltersContainer>

            <Grid gap="s">
                {getPaginatedData()?.length > 0 ? (
                    getPaginatedData()?.map(comment => (
                        <CommentLine comment={comment} key={comment._id} />
                    ))
                ) : (
                    <Text>No comment yet.</Text>
                )}

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
