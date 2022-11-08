/*=============================================== AddUser ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import AddUserForm from "../../../components/dashboard/AddUserForm"

const AddUser = () => {
    return (
        <PageDashboard
            title="Add a new user"
            back="/dashboard/users"
            role="admin"
        >
            <Text tag="h1">Add a new user</Text>

            <AddUserForm />
        </PageDashboard>
    )
}

export default AddUser
