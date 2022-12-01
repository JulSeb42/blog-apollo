/*=============================================== GlobalPage ===============================================*/

import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { useParams, Navigate } from "react-router-dom"
import { Text, MarkdownContainer } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../context/auth"

import Page from "../components/layouts/Page"
import NotFound from "./NotFound"

import { PAGE } from "../graphql/queries"
import { PageType } from "../types"

const GlobalPage = () => {
    const { slug } = useParams()
    const { isLoggedIn } = useContext(AuthContext) as AuthContextType

    const { data, loading, error } = useQuery(PAGE, {
        variables: {
            slug,
        },
    })

    const page: PageType = data?.page

    if (page?.draft && !isLoggedIn) return <Navigate to="/" />

    if (error && error.message === "Page not found") return <NotFound />

    return (
        <Page title={page?.title} isLoading={loading} error={error?.message}>
            <Text tag="h1">{page?.title}</Text>

            <MarkdownContainer content={page?.body} />
        </Page>
    )
}

export default GlobalPage
