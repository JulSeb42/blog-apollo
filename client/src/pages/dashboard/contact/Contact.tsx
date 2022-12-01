/*=============================================== ContactDashboard ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"
import { uuid } from "../../../utils"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ListCards from "../../../components/dashboard/ListCards"
import ContactLine from "../../../components/dashboard/ContactLine"

const ContactDashboard = () => {
    const pages = ["contact", "thank-you"]

    return (
        <PageDashboard title="Contact" role="admin">
            <Text tag="h1">Contact pages</Text>

            <ListCards>
                {pages.map(page => (
                    <ContactLine title={page} key={uuid()} />
                ))}
            </ListCards>
        </PageDashboard>
    )
}

export default ContactDashboard
