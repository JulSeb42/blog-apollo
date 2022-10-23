/*=============================================== AllAuthors ===============================================*/

import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ComponentProps, Grid } from "tsx-library-julseb"
import { useSearchParams } from "react-router-dom"

import Page from "../../components/layouts/Page"
import ErrorPage from "../../components/layouts/ErrorPage"
import Pagination from "../../components/Pagination"
import CardAuthorSmall from "../../components/author/CardAuthorSmall"

import { ALL_USERS } from "../../graphql/queries"

import { UserType } from "../../types"

import { dataLimit, pageLimit } from "../../config/pagination.config"

const AllAuthors = () => {
    const breadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Authors",
        },
    ]

    const { data, loading, error } = useQuery(ALL_USERS)

    const authors: UserType[] = data?.users

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return authors?.slice(startIndex, endIndex)
    }

    const length = authors?.length || 0

    const numberOfPages = Math.ceil(length / dataLimit)

    if (error) return <ErrorPage error={error.message} />

    return (
        <Page
            title="All authors"
            aside={{ posts: true, categories: true }}
            breadcrumbs={breadcrumbs}
            isLoading={loading}
        >
            <Grid col={3} gap="l">
                {getPaginatedData()?.map(author => (
                    <CardAuthorSmall author={author} key={author._id} />
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
        </Page>
    )
}

export default AllAuthors
