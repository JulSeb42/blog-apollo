/*=============================================== ListPosts ===============================================*/

import React, { useState } from "react"
import { Grid, Button } from "tsx-library-julseb"
import { useSearchParams } from "react-router-dom"

import Pagination from "../Pagination"
import CardPost from "./CardPost"

import { PostType } from "../../types"

import { dataLimit, pageLimit } from "../../config/pagination.config"

const ListPosts = ({ pagination = true, data }: Props) => {
    const [query] = useSearchParams()
    const pageNumber = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState<number>(
        pageNumber === 1 ? pageNumber : parseInt(pageNumber)
    )

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit
        const endIndex = startIndex + dataLimit
        return data?.slice(startIndex, endIndex)
    }

    const length = data?.length || 0

    const numberOfPages = Math.ceil(length / dataLimit)

    const arr = pagination ? getPaginatedData() : data?.slice(0, 10)

    return (
        <>
            <Grid col={2} gap="l">
                {arr?.map(post => (
                    <CardPost post={post} key={post._id} />
                ))}
            </Grid>

            {pagination ? (
                numberOfPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={numberOfPages}
                        pageLimit={pageLimit}
                    />
                )
            ) : (
                <Grid>
                    <Button to="/posts">See all posts</Button>
                </Grid>
            )}
        </>
    )
}

export default ListPosts

interface Props {
    pagination?: boolean
    data: PostType[]
}
