/*=============================================== ThankYou ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"
import { Text, MarkdownContainer } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"
import NotFound from "../NotFound"

import { GET_THANK_YOU, GET_CONTACT_PAGE } from "../../graphql/queries"
import { ThankYouType, ContactPagesType } from "../../types"

const ThankYou = () => {
    const { data, error, loading } = useQuery(GET_THANK_YOU)
    const {
        data: contactData,
        error: contactError,
        loading: contactLoading,
    } = useQuery(GET_CONTACT_PAGE)
    const page: ThankYouType = data?.thankYouPage
    const contactPage: ContactPagesType = contactData?.contactPage

    if (contactPage?.hideContact) return <NotFound />

    return (
        <Page
            title={page?.title}
            error={error?.message || contactError?.message}
            isLoading={loading || contactLoading}
        >
            <Text tag="h1">{page?.title}</Text>

            <MarkdownContainer content={page?.body} />
        </Page>
    )
}

export default ThankYou
