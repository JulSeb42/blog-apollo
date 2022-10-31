/*=============================================== ChangePassword ===============================================*/

import React, { useContext } from "react"
import { Text } from "tsx-library-julseb"
import { Navigate } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../../context/auth"

import Page from "../../../components/layouts/Page"
import EditPasswordForm from "../../../components/dashboard/EditPasswordForm"

const ChangePassword = () => {
    const { user } = useContext(AuthContext) as AuthContextType

    if (user?.password !== user?.generatedPassword)
        return <Navigate to="/dashboard" />

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
