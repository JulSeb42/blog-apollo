/*=============================================== AuthorDetail ===============================================*/

import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { ComponentProps } from "tsx-library-julseb"
import { unslugifyAuthor } from "../../utils"

import Page from "../../components/layouts/Page"
import CardAuthor from "../../components/author/CardAuthor"
import ListPosts from "../../components/posts/ListPosts"

import { GET_USER } from "../../graphql/queries"

import { UserType } from "../../types"

const AuthorDetail = () => {
    const { fullName } = useParams()
    const authorName = fullName ? unslugifyAuthor(fullName) : "Author"

    const breadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Authors",
            to: "/authors",
        },
        {
            text: authorName,
        },
    ]

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            fullName: authorName,
        },
    })
    const author: UserType = data?.user

    return (
        <Page
            title={authorName}
            aside={{ posts: true, categories: true }}
            breadcrumbs={breadcrumbs}
            author
            isLoading={loading}
            error={error?.message}
        >
            <CardAuthor author={author} />

            <ListPosts data={author?.posts} />
        </Page>
    )
}

export default AuthorDetail
