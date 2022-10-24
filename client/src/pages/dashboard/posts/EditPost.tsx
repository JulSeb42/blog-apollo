/*=============================================== EditPost ===============================================*/

import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { useParams, useNavigate } from "react-router-dom"
import { Text } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ErrorPage from "../../../components/layouts/ErrorPage"
import PostForm from "../../../components/dashboard/PostForm"
import DangerZone from "../../../components/DangerZone"
import ErrorMessages from "../../../components/ErrorMessages"

import { GET_POST_BY_ID, ALL_POSTS } from "../../../graphql/queries"
import { DELETE_POST } from "../../../graphql/mutations"
import { PostType } from "../../../types"

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, loading, error } = useQuery(GET_POST_BY_ID, {
        variables: {
            _id: id,
        },
    })
    const post: PostType = data?.postById
    const pageTitle = `Edit ${loading ? "Post" : post?.title}`

    const [deletePost, { loading: deleteLoading }] = useMutation(DELETE_POST)
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleDelete = () => {
        deletePost({
            variables: {
                _id: id,
            },
            refetchQueries: [
                {
                    query: ALL_POSTS,
                },
            ],
            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },
        }).then(res => {
            if (!res.errors) {
                navigate("/dashboard")
            }
        })
    }

    if (error) return <ErrorPage error={error.message} />

    return (
        <PageDashboard title={pageTitle} isLoading={loading}>
            <Text tag="h1">{pageTitle}</Text>

            <PostForm post={post} />

            <DangerZone
                texts={{
                    buttonOpen: "Delete this post",
                    body: `Are you sure you want to delete ${post?.title}?`,
                }}
                buttonPrimary={{
                    text: "Yes, delete this post",
                    onClick: handleDelete,
                    isLoading: deleteLoading,
                }}
            />

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </PageDashboard>
    )
}

export default EditPost
