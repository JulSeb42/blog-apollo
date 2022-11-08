/*=============================================== SetupUsers ===============================================*/

import React, { useState, useContext } from "react"
import { useQuery } from "@apollo/client"
import { Grid, Text, Button } from "tsx-library-julseb"

import { AuthContext, AuthContextType } from "../../context/auth"

import PageSetup from "../../components/layouts/PageSetup"
import CardAuthorSmall from "../../components/author/CardAuthorSmall"
import AddUserForm from "../../components/dashboard/AddUserForm"

import { ALL_USERS } from "../../graphql/queries"
import { UserType } from "../../types"

const SetupUsers = () => {
    const { user } = useContext(AuthContext) as AuthContextType

    const { data, loading, error } = useQuery(ALL_USERS)
    const users: UserType[] = data?.users

    const [isOpen, setIsOpen] = useState(false)

    return (
        <PageSetup
            title="Add users"
            active={2}
            isLoading={loading}
            error={error?.message}
            next="/setup/create-categories"
        >
            {isOpen ? (
                <AddUserForm setIsOpen={setIsOpen} isSetup />
            ) : (
                <Button onClick={() => setIsOpen(true)}>Add a new user</Button>
            )}

            {users?.filter(foundUser => foundUser._id !== user?._id)?.length >
            0 ? (
                <Grid col={3} gap="s">
                    {users
                        ?.filter(foundUser => foundUser._id !== user?._id)
                        .map(author => (
                            <CardAuthorSmall
                                author={author}
                                readonly
                                key={author._id}
                            />
                        ))}
                </Grid>
            ) : (
                <Text>No other user yet.</Text>
            )}
        </PageSetup>
    )
}

export default SetupUsers
