/*=============================================== ListAside component ===============================================*/

import React from "react"
import { Text, Flexbox, Loader } from "tsx-library-julseb"
import { capitalize, slugify, unslugify } from "../../../utils"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

import * as Styles from "./styles"
import { ListAsideProps } from "./types"

import {
    ALL_CATEGORIES,
    ALL_POSTS,
    FEATURED_AUTHORS,
} from "../../../graphql/queries"

import { UserType, CategoryType, PostType } from "../../../types"

const ListAside = ({ content }: ListAsideProps) => {
    const {
        data: authorsData,
        error: authorsError,
        loading: authorsLoading,
    } = useQuery(FEATURED_AUTHORS)
    const {
        data: categoriesData,
        error: categoryError,
        loading: categoryLoading,
    } = useQuery(ALL_CATEGORIES)
    const {
        data: postsData,
        error: postsError,
        loading: postsLoading,
    } = useQuery(ALL_POSTS)

    const featuredAuthors: UserType[] = authorsData?.users.slice(0, 5)
    const categories: CategoryType[] = categoriesData?.categories.slice(0, 5)
    const posts: PostType[] = postsData?.posts.slice(0, 5)

    return (
        <Styles.StyledListAside>
            <Text tag="h4">
                {content === "posts" ? "Latest posts" : capitalize(content)}
            </Text>

            {(authorsLoading || categoryLoading || postsLoading) && (
                <Flexbox
                    alignItems="center"
                    justifyContent="center"
                    padding="l"
                >
                    <Loader size={24} variant={4} />
                </Flexbox>
            )}

            {content === "authors" ? (
                authorsError ? (
                    <Text>{authorsError.message}</Text>
                ) : (
                    authorsData && (
                        <>
                            {featuredAuthors.map(author => (
                                <Styles.Text
                                    icon="chevron-right"
                                    key={author._id}
                                >
                                    <Link
                                        to={`/authors/${slugify(
                                            author.fullName
                                        )}`}
                                    >
                                        {author.fullName}
                                    </Link>
                                </Styles.Text>
                            ))}
                        </>
                    )
                )
            ) : content === "categories" ? (
                categoryError ? (
                    <Text>{categoryError.message}</Text>
                ) : (
                    categoriesData &&
                    categories.map(category => (
                        <Styles.Text icon="chevron-right" key={category._id}>
                            <Link to={`/categories/${slugify(category.name)}`}>
                                {unslugify(category.name)}
                            </Link>
                        </Styles.Text>
                    ))
                )
            ) : content === "posts" && postsError ? (
                <Text>{postsError.message}</Text>
            ) : (
                postsData &&
                posts.map(post => (
                    <Styles.Text icon="chevron-right" key={post._id}>
                        <Link to={`/posts/${post.category.name}/${post.slug}`}>{post.title}</Link>
                    </Styles.Text>
                ))
            )}

            <Styles.Text icon="chevron-right">
                <Link to={`/${content}`}>All {content}</Link>
            </Styles.Text>
        </Styles.StyledListAside>
    )
}

export default ListAside
