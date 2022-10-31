/*=============================================== GlobalPage ===============================================*/

import React, { useContext } from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { Text, MarkdownContainer } from "tsx-library-julseb"
import { Navigate } from "react-router-dom"

import { AuthContext, AuthContextType } from "../context/auth"

import Page from "../components/layouts/Page"
import ContactForm from "../components/ContactForm"

import { PAGE } from "../graphql/queries"
import { PageType } from "../types"

import siteData from "../data/site-data"

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

    return (
        <Page
            title={page?.title}
            isLoading={loading}
            error={error?.message}
            mainWidth={page?._id === siteData.contactId ? "form" : "default"}
        >
            <Text tag="h1">{page?.title}</Text>

            <MarkdownContainer content={page?.body} />

            {page?._id === siteData.contactId && <ContactForm />}
        </Page>
    )
}

export default GlobalPage
