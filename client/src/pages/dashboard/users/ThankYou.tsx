/*=============================================== ThankYou ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import Page from "../../../components/layouts/Page"

const ThankYou = () => {
    return (
        <Page title="Thank you for editing your password">
            <Text tag="h1">Thank you for editing your password</Text>

            <Text>
                You can now fully access the dashboard.{" "}
                <Link to="/dashboard">Access the dashboard.</Link>
            </Text>
        </Page>
    )
}

export default ThankYou
