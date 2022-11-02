/*=============================================== GetApproval ===============================================*/

import React, { useContext } from "react"
import { Text, Button } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"

import { GET_ADMIN } from "../../graphql/queries"
import { UserType } from "../../types"

const GetApproval = () => {
    const { data, loading, error } = useQuery(GET_ADMIN)
    const users: UserType[] = data?.users

    const { logoutUser } = useContext(AuthContext) as AuthContextType

    return (
        <Page
            title="Get approval from admin"
            isLoading={loading}
            error={error?.message}
        >
            <Text tag="h1">Your account is not approved</Text>

            <Text>
                Please contact {users?.length > 1 ? " " : "the "}admin
                {users?.length > 1 ? "s" : ""} to get approval:
            </Text>

            <Text tag="ul">
                {users?.map(user => (
                    <li key={user._id}>
                        {user.fullName}:{" "}
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                    </li>
                ))}
            </Text>

            <Button onClick={logoutUser}>Log out</Button>
        </Page>
    )
}

export default GetApproval
