/*=============================================== AllCategories ===============================================*/

import React, { useState } from "react"
import { ComponentProps, Grid } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "react-router-dom"

import Page from "../../components/layouts/Page"
import ErrorPage from "../../components/layouts/ErrorPage"
import CategoryCard from "../../components/posts/CategoryCard"
import Pagination from "../../components/Pagination"

import { ALL_CATEGORIES } from "../../graphql/queries"
import { CategoryType } from "../../types"
import { dataLimit, pageLimit } from "../../config/pagination.config"

const AllCategories = () => {
    const breadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Categories",
        },
    ]

    const { data, loading, error } = useQuery(ALL_CATEGORIES)
    const categories: CategoryType[] = data?.categories?.filter(
        (category: CategoryType) => category.posts.length > 0
    )

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return categories?.slice(startIndex, endIndex)
    }

    const length = categories?.length || 0

    const numberOfPages = Math.ceil(length / dataLimit)

    if (error) return <ErrorPage error={error.message} />

    return (
        <Page
            title="Categories"
            aside={{ posts: true, authors: true }}
            breadcrumbs={breadcrumbs}
            isLoading={loading}
        >
            <Grid col={3} gap="l">
                {getPaginatedData()?.map(category => (
                    <CategoryCard category={category} key={category._id} />
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

export default AllCategories
