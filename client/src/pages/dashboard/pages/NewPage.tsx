/*=============================================== NewPage ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import PageForm from "../../../components/dashboard/PageForm"

const NewPage = () => {
    return (
        <PageDashboard
            title="Add a new page"
            back="/dashboard/pages"
            role="admin"
        >
            <Text tag="h1">Add a new page</Text>

            <PageForm />
        </PageDashboard>
    )
}

export default NewPage
