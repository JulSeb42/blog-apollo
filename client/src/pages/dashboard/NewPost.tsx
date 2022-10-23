/*=============================================== NewPost ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import PageDashboard from "../../components/dashboard/PageDashboard"
import PostForm from "../../components/dashboard/PostForm"

const NewPost = () => {
    return (
        <PageDashboard title="Add a new post">
            <Text tag="h1">Add a new post</Text>

            <PostForm />
        </PageDashboard>
    )
}

export default NewPost
