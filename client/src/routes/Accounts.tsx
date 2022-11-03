/*=============================================== Accounts ===============================================*/

/*
    Here, we redirect to account creation if there are no other users
*/

import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { PageLoading } from "tsx-library-julseb"
import { Navigate, useLocation } from "react-router-dom"

import { AuthContext, AuthContextType } from "../context/auth"

import ErrorPage from "../components/layouts/ErrorPage"

import { ALL_USERS } from "../graphql/queries"
import { UserType } from "../types"

const Accounts = ({ children }: Props) => {
    const { isLoggedIn } = useContext(AuthContext) as AuthContextType

    const location = useLocation().pathname

    const { data, error, loading } = useQuery(ALL_USERS)
    const users: UserType[] = data?.users

    if (error) return <ErrorPage error={error?.message} />

    return loading ? (
        <PageLoading loaderVariant={4} />
    ) : !users?.length &&
      !isLoggedIn &&
      location !== "/create-first-account" ? (
        <Navigate to="/create-first-account" />
    ) : (
        children
    )
}

export default Accounts

interface Props {
    children?: any
}
