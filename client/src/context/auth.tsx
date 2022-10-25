/*=============================================== Auth context ===============================================*/

import React, { useState, useEffect, createContext } from "react"
import { GraphQLErrors } from "@apollo/client/errors"
import { useQuery } from "@apollo/client"

import { USER_BY_TOKEN } from "../graphql/queries"
import { UserType } from "../types"

export type AuthContextType = {
    isLoggedIn?: boolean
    isLoading?: boolean
    user?: UserType | null
    setUser: (user: null | UserType) => void
    loginUser: (user: UserType) => void
    logoutUser: () => void
    setToken: (token: string) => void
    error?: GraphQLErrors
}

const AuthContext = createContext<UserType | AuthContextType | null>(null)

const AuthProviderWrapper = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const loginUser = (userData: UserType) => {
        localStorage.setItem("authToken", userData.token)
        setIsLoggedIn(true)
        setIsLoading(false)
    }

    const setToken = (token: string) => {
        localStorage.setItem("authToken", token)
        setIsLoggedIn(true)
    }

    const logoutUser = () => {
        localStorage.removeItem("authToken")
    }

    const authToken = localStorage.getItem("authToken") || undefined

    const { data, loading } = useQuery(USER_BY_TOKEN, {
        variables: {
            token: authToken,
        },
        skip: !authToken,
    })

    useEffect(() => {
        setUser(data?.userByToken)
        setIsLoading(loading)

        if (authToken) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [data, loading, authToken])

    const value = {
        user,
        loginUser,
        logoutUser,
        isLoggedIn,
        setUser,
        isLoading,
        setToken,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProviderWrapper, AuthContext }

interface Props {
    children?: any
}
