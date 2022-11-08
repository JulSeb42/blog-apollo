/*=============================================== SetupAccount ===============================================*/

import React, { useState, useContext } from "react"
import { Text, Form, Input, ComponentProps } from "tsx-library-julseb"
import { useMutation, useQuery } from "@apollo/client"
import { emailRegex, passwordRegex } from "../../utils"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate, Navigate } from "react-router-dom"
import { getRandomAvatar } from "../../utils"

import { AuthContext, AuthContextType } from "../../context/auth"

import PageSetup from "../../components/layouts/PageSetup"
import ErrorMessages from "../../components/ErrorMessages"
import ImageUploader from "../../components/dashboard/ImageUploader"

import { CREATE_FIRST_ACCOUNT } from "../../graphql/mutations"
import { ALL_USERS } from "../../graphql/queries"
import { UserType } from "../../types"

const SetupAccount = () => {
    const navigate = useNavigate()
    const { loginUser } = useContext(AuthContext) as AuthContextType

    const [inputs, setInputs] = useState({
        fullName: "Jul",
        email: "a@b.com",
        password: "Password42",
        bio: "Don't panic.",
    })
    const [imageUrl, setImageUrl] = useState(getRandomAvatar("other"))
    const [isLoading, setIsLoading] = useState(false)

    const [validation, setValidation] = useState<ValidationProps>({
        fullName: undefined,
        email: undefined,
        password: undefined,
    })

    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
    ) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const [createFirstAccount, { loading }] = useMutation(CREATE_FIRST_ACCOUNT)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !inputs.fullName ||
            !emailRegex.test(inputs.email) ||
            !passwordRegex.test(inputs.password)
        ) {
            setValidation({
                fullName: !inputs.fullName ? "not-passed" : undefined,
                email: !emailRegex.test(inputs.email)
                    ? "not-passed"
                    : undefined,
                password: !passwordRegex.test(inputs.password)
                    ? "not-passed"
                    : undefined,
            })

            return
        }

        createFirstAccount({
            variables: {
                firstUserInput: {
                    ...inputs,
                    imageUrl,
                },
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },

            refetchQueries: [
                {
                    query: ALL_USERS,
                },
            ],
        })
            .then(res => {
                if (!res.errors) {
                    loginUser(res.data.createFirstAccount)
                }
            })
            .then(() => {
                navigate("/setup/create-global-data")
            })
    }

    const {
        data: usersData,
        loading: usersLoading,
        error: usersError,
    } = useQuery(ALL_USERS)
    const users: UserType[] = usersData?.users

    if (users?.length > 0) return <Navigate to="/setup/create-global-data" />

    return (
        <PageSetup
            title="Create admin account"
            isLoading={usersLoading}
            error={usersError?.message}
        >
            <Text>
                To fully access this blog, you need first to create an admin
                account.
            </Text>

            <Form
                buttonPrimary="Create an account"
                onSubmit={handleSubmit}
                isLoading={loading || isLoading}
            >
                <Input
                    id="fullName"
                    label="Full name"
                    value={inputs.fullName}
                    onChange={handleInputs}
                    validation={{
                        status: validation.fullName,
                    }}
                    helperBottom={{
                        text:
                            validation.fullName === "not-passed"
                                ? "Your full name can not be empty"
                                : undefined,
                        icon:
                            validation.fullName === "not-passed"
                                ? "close-circle"
                                : undefined,
                        iconColor: "danger",
                    }}
                />

                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={inputs.email}
                    onChange={handleInputs}
                    validation={{
                        status: validation.email,
                    }}
                    helperBottom={{
                        text:
                            validation.email === "not-passed"
                                ? "Your email address is not valid"
                                : undefined,
                        icon:
                            validation.email === "not-passed"
                                ? "close-circle"
                                : undefined,
                        iconColor: "danger",
                    }}
                />

                <Input
                    id="password"
                    label="Password"
                    password
                    value={inputs.password}
                    onChange={handleInputs}
                    validation={{
                        status: validation.password,
                    }}
                    helperBottom={{
                        text:
                            validation.password === "not-passed"
                                ? "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter"
                                : undefined,
                        icon:
                            validation.password === "not-passed"
                                ? "close-circle"
                                : undefined,
                        iconColor: "danger",
                    }}
                />

                <Input
                    id="bio"
                    label="Bio"
                    value={inputs.bio}
                    onChange={handleInputs}
                    type="textarea"
                />

                <ImageUploader
                    label="Profile picture"
                    imageUrl={imageUrl || ""}
                    setImageUrl={setImageUrl}
                    setIsLoading={setIsLoading}
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </PageSetup>
    )
}

export default SetupAccount

type ValidationProps = {
    fullName: undefined | ComponentProps.ValidationStatusProps
    email: undefined | ComponentProps.ValidationStatusProps
    password: undefined | ComponentProps.ValidationStatusProps
}
