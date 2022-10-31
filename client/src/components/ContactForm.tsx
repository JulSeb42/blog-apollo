/*=============================================== ContactForm ===============================================*/

import React, { useState } from "react"
import { Form, Input, ComponentProps } from "tsx-library-julseb"
import { emailRegex } from "../utils"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"

import ErrorMessages from "./ErrorMessages"

import { CONTACT } from "../graphql/mutations"

const ContactForm = () => {
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const [validation, setValidation] = useState<ValidationType>({
        name: undefined,
        email: undefined,
        subject: undefined,
        message: undefined,
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

    const [contact, { loading }] = useMutation(CONTACT)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !inputs.name ||
            !emailRegex.test(inputs.email) ||
            !inputs.subject ||
            !inputs.message
        ) {
            setValidation({
                name: !inputs.name ? "not-passed" : undefined,
                email: !emailRegex.test(inputs.email)
                    ? "not-passed"
                    : undefined,
                subject: !inputs.subject ? "not-passed" : undefined,
                message: !inputs.message ? "not-passed" : undefined,
            })
        }

        contact({
            variables: {
                contactInput: {
                    ...inputs,
                },
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },
        }).then(res => {
            if (!res.errors) {
                navigate("/thank-you")
            }
        })
    }

    return (
        <>
            <Form
                buttonPrimary="Send message"
                onSubmit={handleSubmit}
                isLoading={loading}
            >
                <Input
                    id="name"
                    label="Your name"
                    value={inputs.name}
                    onChange={handleInputs}
                    validation={{
                        status: validation.name,
                    }}
                    helperBottom={{
                        text:
                            validation.name === "not-passed"
                                ? "Name is required"
                                : undefined,
                        icon:
                            validation.name === "not-passed"
                                ? "close-circle"
                                : undefined,
                        iconColor: "danger",
                    }}
                />

                <Input
                    id="email"
                    label="Your email"
                    value={inputs.email}
                    onChange={handleInputs}
                    validation={{
                        status: validation.email,
                    }}
                    helperBottom={{
                        text:
                            validation.email === "not-passed"
                                ? "Email is not valid"
                                : undefined,
                        icon:
                            validation.email === "not-passed"
                                ? "close-circle"
                                : undefined,
                        iconColor: "danger",
                    }}
                />

                <Input
                    id="subject"
                    label="Subject of the message"
                    value={inputs.subject}
                    onChange={handleInputs}
                    validation={{
                        status: validation.subject,
                    }}
                    helperBottom={{
                        text:
                            validation.subject === "not-passed"
                                ? "Subject is required"
                                : undefined,
                        icon:
                            validation.subject === "not-passed"
                                ? "close-circle"
                                : undefined,
                        iconColor: "danger",
                    }}
                />

                <Input
                    id="message"
                    label="Your message"
                    value={inputs.message}
                    onChange={handleInputs}
                    validation={{
                        status: validation.message,
                    }}
                    helperBottom={{
                        text:
                            validation.message === "not-passed"
                                ? "Message is required"
                                : undefined,
                        icon:
                            validation.message === "not-passed"
                                ? "close-circle"
                                : undefined,
                        iconColor: "danger",
                    }}
                    type="textarea"
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </>
    )
}

export default ContactForm

type ValidationType = {
    name: ComponentProps.ValidationStatusProps
    email: ComponentProps.ValidationStatusProps
    subject: ComponentProps.ValidationStatusProps
    message: ComponentProps.ValidationStatusProps
}
