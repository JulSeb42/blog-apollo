/*=============================================== EditProfile ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ProfileForm from "../../../components/dashboard/ProfileForm"

const EditProfile = () => {
    return (
        <PageDashboard title="Edit your profile">
            <Text tag="h1">Edit your profile</Text>

            <ProfileForm edit />
        </PageDashboard>
    )
}

export default EditProfile
