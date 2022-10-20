/*=============================================== Homepage ===============================================*/

import React from "react"
import { Wrapper, Main, Aside, Grid, Button } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"

import FullPage from "../components/layouts/FullPage"
import ErrorPage from "../components/layouts/ErrorPage"
import FeaturedPosts from "../components/posts/FeaturedPosts"
import CardPost from "../components/posts/CardPost"
import ListAside from "../components/ListAside"

import { ALL_POSTS } from "../graphql/queries"

import { PostType } from "../types"

const Homepage = () => {
    const { data, error, loading } = useQuery(ALL_POSTS)
    const posts: PostType[] = data?.posts.slice(0, 10)

    if (error) return <ErrorPage error={error.message} />

    return (
        <FullPage
            title="Homepage"
            cover="https://res.cloudinary.com/dyfxmafvr/image/upload/v1648719726/blog-new/brtgxjfi96rvxbzpjqw0.jpg"
            isHomepage
            isLoading={loading}
        >
            <FeaturedPosts />

            <Wrapper template="2cols">
                <Main position={1}>
                    <Grid col={2} gap="xl">
                        {posts?.map(post => (
                            <CardPost post={post} key={post._id} />
                        ))}
                    </Grid>

                    <Grid>
                        <Button to="/posts">See all posts</Button>
                    </Grid>
                </Main>

                <Aside position={2}>
                    <ListAside content="categories" />
                    <ListAside content="authors" />
                </Aside>
            </Wrapper>
        </FullPage>
    )
}

export default Homepage
