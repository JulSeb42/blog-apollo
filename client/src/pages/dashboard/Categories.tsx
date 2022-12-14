/*=============================================== Categories ===============================================*/

import React, { useState } from "react"
import { Text } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "react-router-dom"

import PageDashboard from "../../components/dashboard/PageDashboard"
import CategoryLine from "../../components/dashboard/CategoryLine"
import Pagination from "../../components/Pagination"
import AddCategory from "../../components/dashboard/AddCategory"
import ListCards from "../../components/dashboard/ListCards"

import { ALL_CATEGORIES } from "../../graphql/queries"
import { CategoryType } from "../../types"

import { dataLimit, pageLimit } from "../../config/pagination.config"

const Categories = () => {
    const { data, error, loading } = useQuery(ALL_CATEGORIES)
    const categories: CategoryType[] = data?.categories

    const length = categories?.length

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

    const numberOfPages = Math.ceil(length / dataLimit)

    return (
        <PageDashboard
            title="Categories"
            isLoading={loading}
            error={error?.message}
        >
            <Text tag="h1">Categories</Text>

            <AddCategory />

            {categories?.length > 0 ? (
                <ListCards>
                    {getPaginatedData().map(category => (
                        <CategoryLine category={category} key={category?._id} />
                    ))}
                </ListCards>
            ) : (
                <Text>No category yet.</Text>
            )}

            {numberOfPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={numberOfPages}
                    pageLimit={pageLimit}
                />
            )}
        </PageDashboard>
    )
}

export default Categories
