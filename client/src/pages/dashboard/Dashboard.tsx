/*=============================================== Dashboard ===============================================*/

import React, { useContext, useState } from "react"
import { Text, Input } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import PageDashboard from "../../components/dashboard/PageDashboard"
import CardAuthor from "../../components/author/CardAuthor"
import Pagination from "../../components/Pagination"
import PostLine from "../../components/dashboard/PostLine"
import FiltersContainer from "../../components/dashboard/FiltersContainer"
import ListCards from "../../components/dashboard/ListCards"
import TitleDashboard from "../../components/dashboard/TitleDashboard"

import { POSTS_DASHBOARD, ALL_USERS } from "../../graphql/queries"
import { PostType, UserType } from "../../types"
import { dataLimit, pageLimit } from "../../config/pagination.config"

const Dashboard = () => {
    const { user } = useContext(AuthContext) as AuthContextType

    const {
        data: authorsData,
        error: authorsError,
        loading: authorsLoading,
    } = useQuery(ALL_USERS)
    const authors: UserType[] = authorsData?.users

    const [filters, setFilters] = useState({
        title: "",
        author: "all",
        status: "all",
    })
    const handleFilters = (
        e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) =>
        setFilters({
            ...filters,
            [e.target.id]: e.target.value,
        })
    const resetFilters = () =>
        setFilters({ title: "", author: "all", status: "all" })

    const { data, loading, error } = useQuery(POSTS_DASHBOARD)

    const posts: PostType[] = data?.posts

    let filteredPosts = posts?.filter(post =>
        post.title.toLowerCase().includes(filters.title.toLowerCase())
    )

    if (filters.author !== "all") {
        filteredPosts = filteredPosts.filter(
            post => post.author._id === filters.author
        )
    }

    if (filters.status !== "all") {
        if (filters.status === "published") {
            filteredPosts = filteredPosts.filter(post => post.draft === false)
        }

        if (filters.status === "draft") {
            filteredPosts = filteredPosts.filter(post => post.draft === true)
        }
    }

    const length = filteredPosts?.length

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return filteredPosts?.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(length / dataLimit)

    return user ? (
        <PageDashboard
            title="Dashboard"
            isLoading={loading || authorsLoading}
            error={error?.message || authorsError?.message}
        >
            <CardAuthor author={user} dashboard />

            <TitleDashboard
                title={`Posts (${length} post${length > 1 ? "s" : ""})`}
                buttonText="New post"
                buttonTo="/dashboard/posts/new-post"
                tag="h2"
            />

            <FiltersContainer reset={resetFilters}>
                <Input
                    id="title"
                    label="Search by title"
                    value={filters.title}
                    onChange={handleFilters}
                />

                <Input
                    id="author"
                    label="Filter by authors"
                    value={filters.author}
                    onChange={handleFilters}
                    type="select"
                >
                    <option value="all">All</option>

                    {authors?.map(author => (
                        <option value={author._id} key={author._id}>
                            {author.fullName === user?.fullName
                                ? "Me"
                                : author.fullName}
                        </option>
                    ))}
                </Input>

                <Input
                    id="status"
                    label="Filter by status"
                    value={filters.status}
                    onChange={handleFilters}
                    type="select"
                >
                    <option value="all">All</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </Input>
            </FiltersContainer>

            <ListCards>
                {getPaginatedData()?.length > 0 ? (
                    getPaginatedData()?.map(post => (
                        <PostLine post={post} key={post._id} />
                    ))
                ) : (
                    <Text>No post.</Text>
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
    ) : (
        <div />
    )
}

export default Dashboard
