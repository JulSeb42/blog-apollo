/*=============================================== AddUserForm ===============================================*/

import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { Form, Input, Text, Button, Flexbox } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import CheckCircle from "../icons/CheckCircle"
import ErrorMessages from "../ErrorMessages"

import { USERS_DASHBOARD, ALL_USERS } from "../../graphql/queries"
import { ADD_USER } from "../../graphql/mutations"

const AddUserForm = ({ isSetup, setIsOpen }: Props) => {
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

    const handleReset = () => {
        setInputs({
            fullName: "",
            email: "",
            role: "writer",
        })

        if (isSetup && setIsOpen) {
            setIsOpen(false)
        }
    }

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
                    query: isSetup ? ALL_USERS : USERS_DASHBOARD,
                },
            ],
        }).then(res => {
            if (!res.errors && !isSetup) {
                navigate("/dashboard/users")
                toast(`${inputs.fullName} was successfully added!`, {
                    icon: <CheckCircle />,
                })
            }

            if (isSetup) {
                handleReset()
            }
        })
    }

    return (
        <>
            <Text>
                The created user will receive an email with a link to login and
                a generated password.
            </Text>

            <Form
                // buttonPrimary="Add a new user"
                // buttonSecondary={{
                //     text: "Cancel",
                //     to: isSetup ? undefined : "/dashboard/users",
                //     onClick: isSetup ? setIsOpen(false) : undefined
                // }}
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

                <Flexbox gap="xs" alignItems="center">
                    <Button type="submit">Add a new user</Button>
                    <Button
                        onClick={isSetup ? handleReset : undefined}
                        to={!isSetup ? "/dashboard/users" : undefined}
                        variant="text"
                    >
                        Cancel
                    </Button>
                </Flexbox>
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </>
    )
}

export default AddUserForm

interface Possible1 {
    isSetup?: true
    setIsOpen: (isOpen: boolean) => void
}

interface Possible2 {
    isSetup?: boolean
    setIsOpen?: never
}

type Props = Possible1 | Possible2
