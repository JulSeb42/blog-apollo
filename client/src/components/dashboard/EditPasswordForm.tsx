/*=============================================== EditPasswordForm ===============================================*/

import React, { useState, useContext } from "react"
import { Form, Input } from "tsx-library-julseb"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { AuthContext, AuthContextType } from "../../context/auth"

import ErrorMessages from "../ErrorMessages"
import CheckCircle from "../icons/CheckCircle"

import { EDIT_PASSWORD } from "../../graphql/mutations"
import { USER_BY_TOKEN } from "../../graphql/queries"

const EditPasswordForm = ({ newUser }: Props) => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext) as AuthContextType

    const [inputs, setInputs] = useState({
        oldPassword: "",
        newPassword: "",
    })
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const [editPassword, { loading }] = useMutation(EDIT_PASSWORD)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        editPassword({
            variables: {
                editPasswordInput: {
                    ...inputs,
                    _id: user?._id,
                },
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },

            refetchQueries: [
                {
                    query: USER_BY_TOKEN,
                    variables: {
                        token: user?.token,
                    },
                },
            ],
        }).then(res => {
            if (!res.errors) {
                navigate(newUser ? "/dashboard/thank-you" : "/dashboard")
                toast("Your password was successfully edited!", {
                    icon: <CheckCircle />,
                })
            }
        })
    }

    return (
        <>
            <Form
                buttonPrimary="Save your new password"
                isLoading={loading}
                onSubmit={handleSubmit}
            >
                <Input
                    id="oldPassword"
                    label="Old password"
                    password
                    value={inputs.oldPassword}
                    onChange={handleInputs}
                />

                <Input
                    id="newPassword"
                    label="New password"
                    password
                    value={inputs.newPassword}
                    onChange={handleInputs}
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </>
    )
}

export default EditPasswordForm

interface Props {
    newUser?: boolean
}
