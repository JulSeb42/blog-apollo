/*=============================================== ListAside component ===============================================*/

import React from "react"
import { Text, Flexbox, Loader } from "tsx-library-julseb"
import { slugify, unslugify } from "../../../utils"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

import * as Styles from "./styles"
import { ListAsideProps } from "./types"

import {
    ALL_CATEGORIES,
    PUBLISHED_POSTS,
    FEATURED_AUTHORS,
    ALL_USERS,
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
    } = useQuery(PUBLISHED_POSTS)

    const {
        data: allUsersData,
        error: allUsersError,
        loading: allUsersLoading,
    } = useQuery(ALL_USERS)

    const featuredAuthors: UserType[] = authorsData?.users.slice(0, 5)
    const allUsers: UserType[] = allUsersData?.users
    const categories: CategoryType[] = categoriesData?.categories
        .filter((category: CategoryType) => category.posts.length > 0)
        .slice(0, 5)
    const posts: PostType[] = postsData?.posts.slice(0, 5)

    return (
        <Styles.StyledListAside>
            {content === "authors" && allUsers?.length > 1 ? (
                <Text tag="h4">Authors</Text>
            ) : content === "categories" && categories?.length > 0 ? (
                <Text tag="h4">Categories</Text>
            ) : (
                content === "posts" &&
                posts?.length > 0 && <Text tag="h4">Latest posts</Text>
            )}

            {(authorsLoading ||
                categoryLoading ||
                postsLoading ||
                allUsersLoading) && (
                <Flexbox
                    alignItems="center"
                    justifyContent="center"
                    padding="l"
                >
                    <Loader size={24} variant={4} />
                </Flexbox>
            )}

            {content === "authors" ? (
                authorsError || allUsersError ? (
                    <Text>
                        {authorsError?.message || allUsersError?.message}
                    </Text>
                ) : (
                    authorsData &&
                    allUsers?.length > 1 && (
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
            ) : content === "categories" && categories?.length > 0 ? (
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
                        <Link to={`/posts/${post.category.name}/${post.slug}`}>
                            {post.title}
                        </Link>
                    </Styles.Text>
                ))
            )}

            {content === "authors" && allUsers?.length > 1 ? (
                <Styles.Text icon="chevron-right">
                    <Link to="authors">All authors</Link>
                </Styles.Text>
            ) : content === "categories" && categories?.length > 0 ? (
                <Styles.Text icon="chevron-right">
                    <Link to="/categories">All categories</Link>
                </Styles.Text>
            ) : (
                content === "posts" &&
                posts?.length > 0 && (
                    <Styles.Text icon="chevron-right">
                        <Link to="/posts">All posts</Link>
                    </Styles.Text>
                )
            )}
        </Styles.StyledListAside>
    )
}

export default ListAside
