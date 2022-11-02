/*=============================================== AllCategories ===============================================*/

import React, { useState } from "react"
import { ComponentProps, Grid } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "react-router-dom"

import Page from "../../components/layouts/Page"
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
    const categories: CategoryType[] = data?.categories

    const filteredCategories = categories.filter(
        category => category.posts.length > 0
    )

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return filteredCategories?.slice(startIndex, endIndex)
    }

    const length = filteredCategories?.length || 0

    const numberOfPages = Math.ceil(length / dataLimit)

    return (
        <Page
            title="Categories"
            aside={{ posts: true, authors: true }}
            breadcrumbs={breadcrumbs}
            isLoading={loading}
            error={error?.message}
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
