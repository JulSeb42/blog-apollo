/*=============================================== UsersPage ===============================================*/

import React, { useState } from "react"
import { Text, Flexbox, Button, Input } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"
import { useSearchParams } from "react-router-dom"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ErrorPage from "../../../components/layouts/ErrorPage"
import FiltersContainer from "../../../components/dashboard/FiltersContainer"
import Pagination from "../../../components/Pagination"
import ListCards from "../../../components/dashboard/ListCards"
import UserLine from "../../../components/dashboard/UserLine"
import HeaderListUsers from "../../../components/dashboard/HeaderListUsers"

import { USERS_DASHBOARD } from "../../../graphql/queries"
import { UserType } from "../../../types"

import { dataLimit, pageLimit } from "../../../config/pagination.config"

const UsersPage = () => {
    const { data, loading, error } = useQuery(USERS_DASHBOARD)
    const users: UserType[] = data?.users

    const [inputs, setInputs] = useState({
        search: "",
        role: "all",
        status: "all",
    })

    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleReset = () =>
        setInputs({ search: "", role: "all", status: "all" })

    let results = users?.filter(user =>
        user.fullName.toLowerCase().includes(inputs.search.toLowerCase())
    )

    if (inputs.role !== "all") {
        results = results.filter(user => user.role === inputs.role)
    }

    if (inputs.status !== "all") {
        if (inputs.status === "approved") {
            results = results.filter(user => user.approved === false)
        }

        if (inputs.status === "not-approved") {
            results = results.filter(user => user.approved === false)
        }
    }

    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return results?.slice(startIndex, endIndex)
    }

    const numberOfPages = Math.ceil(results?.length / dataLimit)

    if (error) return <ErrorPage error={error.message} />

    return (
        <PageDashboard title="All users" isLoading={loading} role="admin">
            <Flexbox
                alignItems="center"
                justifyContent="space-between"
                gap="xs"
            >
                <Text tag="h1">
                    All users ({results?.length} user
                    {results?.length > 1 ? "s" : ""})
                </Text>

                <Button to="/dashboard/users/new-user">Add a new user</Button>
            </Flexbox>

            <FiltersContainer reset={handleReset}>
                <Input
                    id="search"
                    label="Search by name"
                    value={inputs.search}
                    onChange={handleInputs}
                />

                <Input
                    id="role"
                    label="Filter by role"
                    value={inputs.role}
                    onChange={handleInputs}
                    type="select"
                >
                    <option value="all">All</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="writer">Writer</option>
                </Input>

                <Input
                    id="status"
                    label="Filter by status"
                    value={inputs.status}
                    onChange={handleInputs}
                    type="select"
                >
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="not-approved">Not approved</option>
                </Input>
            </FiltersContainer>

            <ListCards>
                {getPaginatedData()?.length > 0 ? (
                    <>
                        <HeaderListUsers>
                            <Text tag="h6">Name</Text>
                            <Text tag="h6">Role</Text>
                            <Text tag="h6">Featured</Text>
                            <Text tag="h6">Actions</Text>
                        </HeaderListUsers>

                        {getPaginatedData()?.map(user => (
                            <UserLine user={user} allUsers={users} key={user?._id} />
                        ))}
                    </>
                ) : (
                    <Text>No result.</Text>
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

export default UsersPage
