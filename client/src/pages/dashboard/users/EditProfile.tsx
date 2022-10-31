/*=============================================== EditProfile ===============================================*/

import React, { useContext } from "react"
import { Text } from "tsx-library-julseb"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"

import { AuthContext, AuthContextType } from "../../../context/auth"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ProfileForm from "../../../components/dashboard/ProfileForm"
import DangerZone from "../../../components/DangerZone"
import CheckCircle from "../../../components/icons/CheckCircle"

import { DELETE_USER } from "../../../graphql/mutations"

const EditProfile = () => {
    const navigate = useNavigate()

    const { user, logoutUser } = useContext(AuthContext) as AuthContextType

    const [deleteUser, { loading }] = useMutation(DELETE_USER)

    const handleDelete = () => {
        deleteUser({
            variables: {
                _id: user?._id,
            },
        }).then(() => {
            logoutUser()
            toast("You successfully deleted your account!", {
                icon: <CheckCircle />,
            })
            navigate("/goodbye")
        })
    }

    return (
        <PageDashboard title="Edit your profile">
            <Text tag="h1">Edit your profile</Text>

            <ProfileForm edit />

            <Text>
                <Link to="/dashboard/edit-profile/edit-password">
                    Edit your password.
                </Link>
            </Text>

            <DangerZone
                texts={{
                    buttonOpen: "Delete your account",
                    body: "Are you sure you want to delete your account?",
                    buttonSecondary: "No, cancel",
                }}
                buttonPrimary={{
                    text: "Yes, delete my account",
                    onClick: handleDelete,
                    isLoading: loading,
                }}
            />
        </PageDashboard>
    )
}

export default EditProfile
