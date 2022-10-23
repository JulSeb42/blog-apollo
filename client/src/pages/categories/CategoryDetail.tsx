/*=============================================== CategoryDetail ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { unslugify } from "../../utils"
import { ComponentProps } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"
import ErrorPage from "../../components/layouts/ErrorPage"
import ListPosts from "../../components/ListPosts"

import { CATEGORY } from "../../graphql/queries"
import { PostType } from "../../types"

const CategoryDetail = () => {
    const { name } = useParams()
    const categoryTitle = name ? unslugify(name) : "Category"

    const breadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Categories",
            to: "/categories",
        },
        {
            text: categoryTitle,
        },
    ]

    const { data, loading, error } = useQuery(CATEGORY, {
        variables: {
            name,
        },
    })

    const posts: PostType[] = data?.category?.posts

    if (error) return <ErrorPage error={error.message} />

    return (
        <Page
            title={categoryTitle}
            breadcrumbs={breadcrumbs}
            aside={{
                posts: true,
                categories: true,
                authors: true,
            }}
            isLoading={loading}
        >
            <ListPosts data={posts} />
        </Page>
    )
}

export default CategoryDetail
