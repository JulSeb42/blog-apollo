/*=============================================== AllPages ===============================================*/

import React, { useState } from "react"
import { Text, Button, Input, Flexbox } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "react-router-dom"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ErrorPage from "../../../components/layouts/ErrorPage"
import FiltersContainer from "../../../components/dashboard/FiltersContainer"
import ListCards from "../../../components/dashboard/ListCards"
import PageLine from "../../../components/dashboard/PageLine"
import Pagination from "../../../components/Pagination"

import { ALL_PAGES } from "../../../graphql/queries"
import { PageType } from "../../../types"
import { dataLimit, pageLimit } from "../../../config/pagination.config"

const AllPages = () => {
    const { data, loading, error } = useQuery(ALL_PAGES)
    const pages: PageType[] = data?.pages

    const [inputs, setInputs] = useState({
        search: "",
        filters: "all",
    })

    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleReset = () => setInputs({ search: "", filters: "all" })

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    let results = pages?.filter(page =>
        page.title.toLowerCase().includes(inputs.search.toLowerCase())
    )

    if (inputs.filters !== "all") {
        if (inputs.filters === "published") {
            results = results.filter(page => page.draft === false)
        }

        if (inputs.filters === "draft") {
            results = results.filter(page => page.draft === true)
        }
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results?.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(pages?.length / dataLimit)

    if (error) return <ErrorPage error={error.message} />

    return (
        <PageDashboard title="All pages" isLoading={loading}>
            <Flexbox alignItems="center" justifyContent="space-between">
                <Text tag="h1">
                    All pages ({getPaginatedData()?.length} page
                    {getPaginatedData()?.length > 1 ? "s" : ""})
                </Text>

                <Button to="/dashboard/pages/new-page">Add a new page</Button>
            </Flexbox>

            <FiltersContainer reset={handleReset}>
                <Input
                    id="search"
                    label="Search by title"
                    value={inputs.search}
                    onChange={handleInputs}
                />

                <Input
                    id="filters"
                    label="Filter by status"
                    type="select"
                    value={inputs.filters}
                    onChange={handleInputs}
                >
                    <option value="all">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </Input>
            </FiltersContainer>

            <ListCards>
                {getPaginatedData()?.length > 0 ? (
                    getPaginatedData()?.map(page => (
                        <PageLine page={page} key={page._id} />
                    ))
                ) : (
                    <Text>No page.</Text>
                )}
            </ListCards>

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

export default AllPages
