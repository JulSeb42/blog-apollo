/*=============================================== EditContact ===============================================*/

import React, { useState } from "react"
import {
    Text,
    Form,
    Input,
    InputCheck,
    MarkdownEditor,
    ComponentProps,
} from "tsx-library-julseb"
import { useQuery, useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ErrorMessages from "../../../components/ErrorMessages"
import CheckCircle from "../../../components/icons/CheckCircle"

import { GET_CONTACT_PAGE } from "../../../graphql/queries"
import { EDIT_CONTACT_PAGE } from "../../../graphql/mutations"

import { ContactPagesType } from "../../../types"

const EditContact = () => {
    const navigate = useNavigate()

    const { data, error, loading } = useQuery(GET_CONTACT_PAGE)
    const page: ContactPagesType = data?.contactPage

    const [inputs, setInputs] = useState({
        hideContact: page?.hideContact,
        title: page?.title,
        showForm: page?.showForm,
        labelName: page?.labelName,
        labelEmail: page?.labelEmail,
        labelSubject: page?.labelSubject,
        labelMessage: page?.labelMessage,
        labelButton: page?.labelButton,
    })
    const [body, setBody] = useState(page?.body)
    const [validation, setValidation] = useState<Validation>({
        title: undefined,
        body: undefined,
        labelName: undefined,
        labelEmail: undefined,
        labelSubject: undefined,
        labelMessage: undefined,
        labelButton: undefined,
    })
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleCheckInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.checked,
        })

    const [editContact, { loading: formLoading }] =
        useMutation(EDIT_CONTACT_PAGE)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !inputs.hideContact &&
            (!inputs.title ||
                !body ||
                (inputs.showForm &&
                    (!inputs.labelName ||
                        !inputs.labelEmail ||
                        !inputs.labelSubject ||
                        !inputs.labelMessage ||
                        !inputs.labelButton)))
        ) {
            setValidation({
                title:
                    !inputs.hideContact && !inputs.title
                        ? "not-passed"
                        : undefined,
                body: !inputs.hideContact && !body ? "not-passed" : undefined,
                labelName:
                    !inputs.hideContact && inputs.showForm && !inputs.labelName
                        ? "not-passed"
                        : undefined,
                labelEmail:
                    !inputs.hideContact && inputs.showForm && !inputs.labelEmail
                        ? "not-passed"
                        : undefined,
                labelSubject:
                    !inputs.hideContact &&
                    inputs.showForm &&
                    !inputs.labelSubject
                        ? "not-passed"
                        : undefined,
                labelMessage:
                    !inputs.hideContact &&
                    inputs.showForm &&
                    !inputs.labelMessage
                        ? "not-passed"
                        : undefined,
                labelButton:
                    !inputs.hideContact &&
                    inputs.showForm &&
                    !inputs.labelButton
                        ? "not-passed"
                        : undefined,
            })

            return
        }

        const contactPageInput = {
            ...inputs,
            body,
            _id: page?._id,
        }

        editContact({
            variables: {
                contactPageInput: {
                    ...contactPageInput,
                },
            },

            refetchQueries: [
                {
                    query: GET_CONTACT_PAGE,
                },
            ],

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },
        }).then(res => {
            if (!res.errors) {
                navigate("/dashboard/contact")
                toast("Contact page was edited!", {
                    icon: <CheckCircle />,
                })
            }
        })
    }

    return (
        <PageDashboard
            title="Edit contact page"
            role="admin"
            back="/dashboard/contact"
            isLoading={loading}
            error={error?.message}
        >
            <Text tag="h1">Edit contact page</Text>

            <Form
                buttonPrimary="Save changes"
                buttonSecondary={{ text: "Cancel", to: "/dashboard/contact" }}
                isLoading={formLoading}
                onSubmit={handleSubmit}
            >
                <InputCheck
                    id="hideContact"
                    label="Hide contact page"
                    checkStyle="toggle"
                    type="checkbox"
                    defaultChecked={inputs.hideContact}
                    onChange={handleCheckInputs}
                />

                {!inputs.hideContact && (
                    <>
                        <Input
                            id="title"
                            label="Page title"
                            value={inputs.title}
                            onChange={handleInputs}
                            helperBottom={{
                                text: validation.title
                                    ? "Title is required"
                                    : undefined,
                                icon: validation.title
                                    ? "close-circle"
                                    : undefined,
                                iconColor: "danger",
                            }}
                            validation={{
                                status: validation.title,
                            }}
                        />

                        <MarkdownEditor
                            value={body}
                            setValue={setBody}
                            id="body"
                            label="Page body"
                            preview="edit"
                            backgroundColor="light"
                            helperBottom={{
                                text: validation.body
                                    ? "Body is required"
                                    : undefined,
                                icon: validation.body
                                    ? "close-circle"
                                    : undefined,
                                iconColor: "danger",
                            }}
                            validation={validation.body}
                        />

                        <InputCheck
                            id="showForm"
                            label="Show contact form"
                            checkStyle="toggle"
                            type="checkbox"
                            defaultChecked={inputs.showForm}
                            onChange={handleCheckInputs}
                        />

                        {inputs.showForm && (
                            <>
                                <Input
                                    id="labelName"
                                    label="Label name"
                                    value={inputs.labelName}
                                    onChange={handleInputs}
                                    helperBottom={{
                                        text: validation.labelName
                                            ? "Label name is required"
                                            : undefined,
                                        icon: validation.labelName
                                            ? "close-circle"
                                            : undefined,
                                        iconColor: "danger",
                                    }}
                                    validation={{
                                        status: validation.labelName,
                                    }}
                                />

                                <Input
                                    id="labelEmail"
                                    label="Label email"
                                    value={inputs.labelEmail}
                                    onChange={handleInputs}
                                    helperBottom={{
                                        text: validation.labelEmail
                                            ? "Label email is required"
                                            : undefined,
                                        icon: validation.labelEmail
                                            ? "close-circle"
                                            : undefined,
                                        iconColor: "danger",
                                    }}
                                    validation={{
                                        status: validation.labelEmail,
                                    }}
                                />

                                <Input
                                    id="labelSubject"
                                    label="Label subject"
                                    value={inputs.labelSubject}
                                    onChange={handleInputs}
                                    helperBottom={{
                                        text: validation.labelSubject
                                            ? "Label subject is required"
                                            : undefined,
                                        icon: validation.labelSubject
                                            ? "close-circle"
                                            : undefined,
                                        iconColor: "danger",
                                    }}
                                    validation={{
                                        status: validation.labelSubject,
                                    }}
                                />

                                <Input
                                    id="labelMessage"
                                    label="Label message"
                                    value={inputs.labelMessage}
                                    onChange={handleInputs}
                                    helperBottom={{
                                        text: validation.labelMessage
                                            ? "Label message is required"
                                            : undefined,
                                        icon: validation.labelMessage
                                            ? "close-circle"
                                            : undefined,
                                        iconColor: "danger",
                                    }}
                                    validation={{
                                        status: validation.labelMessage,
                                    }}
                                />
                            </>
                        )}
                    </>
                )}
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </PageDashboard>
    )
}

export default EditContact

type Validation = {
    title: ComponentProps.ValidationStatusProps
    body: ComponentProps.ValidationStatusProps
    labelName: ComponentProps.ValidationStatusProps
    labelEmail: ComponentProps.ValidationStatusProps
    labelSubject: ComponentProps.ValidationStatusProps
    labelMessage: ComponentProps.ValidationStatusProps
    labelButton: ComponentProps.ValidationStatusProps
}
