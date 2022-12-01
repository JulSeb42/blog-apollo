/*=============================================== Contact ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"
import { Text, MarkdownContainer } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"
import NotFound from "../NotFound"
import ContactForm from "../../components/ContactForm"

import { GET_CONTACT_PAGE } from "../../graphql/queries"
import { ContactPagesType } from "../../types"

const Contact = () => {
    const { data, error, loading } = useQuery(GET_CONTACT_PAGE)
    const page: ContactPagesType = data?.contactPage

    if (page?.hideContact) return <NotFound />

    return (
        <Page
            title={page?.title}
            error={error?.message}
            isLoading={loading}
            mainWidth="form"
        >
            <Text tag="h1">{page?.title}</Text>

            <MarkdownContainer content={page?.body} />

            {page?.showForm && <ContactForm contactPage={page} />}
        </Page>
    )
}

export default Contact
