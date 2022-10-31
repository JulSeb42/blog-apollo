/*=============================================== EditPassword ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import EditPasswordForm from "../../../components/dashboard/EditPasswordForm"

const EditPassword = () => {
    return (
        <PageDashboard
            title="Edit your password"
            back="/dashboard/edit-profile"
        >
            <Text tag="h1">Edit password</Text>

            <EditPasswordForm />
        </PageDashboard>
    )
}

export default EditPassword
