/*=============================================== ChangePassword ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import Page from "../../../components/layouts/Page"
import EditPasswordForm from "../../../components/dashboard/EditPasswordForm"

const ChangePassword = () => {
    return (
        <Page title="Change your password" mainWidth="form">
            <Text tag="h1">Edit your password</Text>

            <Text>
                To access the dashboard, please edit the generated password sent
                by email.
            </Text>

            <EditPasswordForm newUser />
        </Page>
    )
}

export default ChangePassword
