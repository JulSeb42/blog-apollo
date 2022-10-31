/*=============================================== EditPage ===============================================*/

import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client"
import { Text } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ErrorPage from "../../../components/layouts/ErrorPage"
import PageForm from "../../../components/dashboard/PageForm"
import DangerZone from "../../../components/DangerZone"
import ErrorMessages from "../../../components/ErrorMessages"

import { PAGE_BY_ID, ALL_PAGES } from "../../../graphql/queries"
import { DELETE_PAGE } from "../../../graphql/mutations"
import { PageType } from "../../../types"

import siteData from "../../../data/site-data"

const EditPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, error, loading } = useQuery(PAGE_BY_ID, {
        variables: {
            _id: id,
        },
    })
    const page: PageType = data?.pageById

    const [deletePage, { loading: deleteLoading }] = useMutation(DELETE_PAGE)
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleDelete = () => {
        deletePage({
            variables: {
                _id: id,
            },
            refetchQueries: [
                {
                    query: ALL_PAGES,
                },
            ],
            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },
        }).then(res => {
            if (!res.errors) {
                navigate("/dashboard/pages")
            }
        })
    }

    if (error) return <ErrorPage error={error.message} />

    return (
        <PageDashboard
            title={`Edit ${page?.title}`}
            back="/dashboard/pages"
            isLoading={loading}
            role="admin"
        >
            <Text tag="h1">Edit {page?.title}</Text>

            <PageForm page={page} />

            {id !== siteData.contactId ? (
                <DangerZone
                    texts={{
                        buttonOpen: "Delete this page",
                        body: `Are you sure you want to delete ${page?.title}?`,
                        buttonSecondary: "No, cancel",
                    }}
                    buttonPrimary={{
                        text: "Yes, delete this page",
                        onClick: handleDelete,
                        isLoading: deleteLoading,
                    }}
                />
            ) : (
                <Text>
                    You can not delete the contact page. If you do not want it
                    to appear, you can add it as a draft.
                </Text>
            )}

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </PageDashboard>
    )
}

export default EditPage