/*=============================================== AllAuthors ===============================================*/

import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ComponentProps, Grid, Text } from "tsx-library-julseb"
import { useSearchParams, Navigate } from "react-router-dom"
import { slugify } from "../../utils"

import Page from "../../components/layouts/Page"
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

    const filteredAuthors = authors?.filter(author => author.posts.length > 0)

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return filteredAuthors?.slice(startIndex, endIndex)
    }

    const length = filteredAuthors?.length || 0

    const numberOfPages = Math.ceil(length / dataLimit)

    if (authors?.length === 1)
        return <Navigate to={`/authors/${slugify(authors[0].fullName)}`} />

    return (
        <Page
            title="All authors"
            aside={{ posts: true, categories: true }}
            breadcrumbs={breadcrumbs}
            isLoading={loading}
            error={error?.message}
        >
            <Grid col={3} gap="l">
                {filteredAuthors?.length > 0 ? (
                    getPaginatedData()?.map(author => (
                        <CardAuthorSmall author={author} key={author._id} />
                    ))
                ) : (
                    <Text>No author.</Text>
                )}
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
