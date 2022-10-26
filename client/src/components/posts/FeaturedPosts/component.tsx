/*=============================================== FeaturedPosts component ===============================================*/

import React from "react"
import { useQuery } from "@apollo/client"
import { Grid, Loader, Flexbox, Text, Image } from "tsx-library-julseb"

import * as Styles from "./styles"

import { FEATURED_POSTS } from "../../../graphql/queries"
import { PostType } from "../../../types"

const FeaturedPosts = () => {
    const { data, error, loading } = useQuery(FEATURED_POSTS)

    const firstRow: PostType[] = data?.posts.slice(0, 2)
    const secondRow: PostType[] = data?.posts.slice(2, 5)

    const cards = (posts: PostType[]) =>
        posts.map(({ _id, slug, title, imageUrl, category }) => (
            <Styles.Card to={`/posts/${category.name}/${slug}`} key={_id}>
                <Image
                    src={imageUrl}
                    alt={`Cover ${title}`}
                    height="100%"
                    fit="cover"
                />

                <Styles.Content tag="h4">{title}</Styles.Content>
            </Styles.Card>
        ))

    if (error) console.log(error)

    return (
        <Styles.StyledFeaturedPosts>
            {loading ? (
                <Flexbox
                    justifyContent="center"
                    alignItems="center"
                    padding="xxl"
                >
                    <Loader variant={4} />
                </Flexbox>
            ) : error ? (
                <Text>{error.message}</Text>
            ) : (
                data && (
                    <>
                        <Grid col={2} gap="l">
                            {cards(firstRow)}
                        </Grid>

                        <Grid col={3} gap="l">
                            {cards(secondRow)}
                        </Grid>
                    </>
                )
            )}
        </Styles.StyledFeaturedPosts>
    )
}

export default FeaturedPosts
