/*=============================================== CategoryDetail ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { unslugify } from "../../utils"
import { ComponentProps } from "tsx-library-julseb"

import Page from "../../components/layouts/Page"
import ListPosts from "../../components/posts/ListPosts"
import NotFound from "../NotFound"

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

    if (data?.category === null) return <NotFound />

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
            error={error?.message}
        >
            <ListPosts data={posts} />
        </Page>
    )
}

export default CategoryDetail
