/*=============================================== Login ===============================================*/

import React, { useState, useContext } from "react"
import { Text, Form, Input, Grid, Button, Section } from "tsx-library-julseb"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"

import { AuthContext, AuthContextType } from "../../context/auth"

import Page from "../../components/layouts/Page"
import ErrorMessages from "../../components/ErrorMessages"

import { LOGIN } from "../../graphql/mutations"

const Login = () => {
    const navigate = useNavigate()
    const { loginUser } = useContext(AuthContext) as AuthContextType

    const [login, { loading }] = useMutation(LOGIN)

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        login({
            variables: {
                loginInput: {
                    ...inputs,
                },
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
            },
        }).then(res => {
            loginUser(res.data.login)
            navigate("/dashboard")
        })
    }

    // Demo accounts
    const handleLogin = (role: "admin" | "moderator" | "writer") => {
        const request = {
            email: `julien@${role}.com`,
            password: "Password42",
        }

        login({
            variables: {
                loginInput: request,
            },
            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
            },
        }).then(res => {
            loginUser(res.data.login)
            navigate("/dashboard")
        })
    }

    return (
        <Page title="Login" mainWidth="form">
            <Text tag="h1">Log in</Text>

            <Form
                buttonPrimary="Log in"
                onSubmit={handleSubmit}
                isLoading={loading}
            >
                <Input
                    id="email"
                    label="Email"
                    value={inputs.email}
                    onChange={handleInputs}
                    type="email"
                />

                <Input
                    id="password"
                    label="Password"
                    value={inputs.password}
                    onChange={handleInputs}
                    password
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}

            <Text>
                <Link to="/login/forgot-password">I forgot my password.</Link>
            </Text>

            <Section gap="small">
                <Text tag="h4">Demo accounts</Text>

                <Grid col={3} gap="xs">
                    <Button onClick={() => handleLogin("admin")}>
                        Login as admin
                    </Button>
                    <Button onClick={() => handleLogin("moderator")}>
                        Login as moderator
                    </Button>
                    <Button onClick={() => handleLogin("writer")}>
                        Login as writer
                    </Button>
                </Grid>
            </Section>
        </Page>
    )
}

export default Login
