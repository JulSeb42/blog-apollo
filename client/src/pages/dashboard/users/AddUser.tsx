/*=============================================== AddUser ===============================================*/

import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { Form, Input, Text } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ErrorMessages from "../../../components/ErrorMessages"

import { ADD_USER } from "../../../graphql/mutations"
import { USERS_DASHBOARD } from "../../../graphql/queries"

const AddUser = () => {
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        role: "writer",
    })
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const [addUser, { loading }] = useMutation(ADD_USER)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        addUser({
            variables: {
                addUserInput: {
                    ...inputs,
                },
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },

            refetchQueries: [
                {
                    query: USERS_DASHBOARD,
                },
            ],
        }).then(res => {
            if (!res.errors) {
                navigate("/dashboard/users")
            }
        })
    }

    return (
        <PageDashboard title="Add a new user" back="/dashboard/users">
            <Text tag="h1">Add a new user</Text>

            <Text>
                The created user will receive an email with a link to login and
                a generated password.
            </Text>

            <Form
                buttonPrimary="Add a new user"
                buttonSecondary={{ text: "Cancel", to: "/dashboard/users" }}
                isLoading={loading}
                onSubmit={handleSubmit}
            >
                <Input
                    id="fullName"
                    label="Full name"
                    value={inputs.fullName}
                    onChange={handleInputs}
                />

                <Input
                    id="email"
                    label="Email"
                    value={inputs.email}
                    onChange={handleInputs}
                    type="email"
                />

                <Input
                    id="role"
                    label="Role"
                    value={inputs.role}
                    onChange={handleInputs}
                    type="select"
                >
                    <option value="writer">Writer</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </Input>
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </PageDashboard>
    )
}

export default AddUser
