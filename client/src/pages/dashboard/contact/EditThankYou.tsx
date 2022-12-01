/*=============================================== EditThankYou ===============================================*/

import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import {
    Text,
    Form,
    Input,
    MarkdownEditor,
    ComponentProps,
} from "tsx-library-julseb"
import { useNavigate, Link } from "react-router-dom"
import { GraphQLErrors } from "@apollo/client/errors"
import toast from "react-hot-toast"

import PageDashboard from "../../../components/dashboard/PageDashboard"
import ErrorMessages from "../../../components/ErrorMessages"
import CheckCircle from "../../../components/icons/CheckCircle"

import { GET_THANK_YOU, GET_CONTACT_PAGE } from "../../../graphql/queries"
import { EDIT_THANK_YOU } from "../../../graphql/mutations"
import { ThankYouType, ContactPagesType } from "../../../types"

const EditThankYou = () => {
    const navigate = useNavigate()

    const { data, error, loading } = useQuery(GET_THANK_YOU)
    const {
        data: contactData,
        error: contactError,
        loading: contactLoading,
    } = useQuery(GET_CONTACT_PAGE)
    const page: ThankYouType = data?.thankYouPage
    const contactPage: ContactPagesType = contactData?.contactPage

    const [title, setTitle] = useState(page?.title)
    const [body, setBody] = useState(page?.body)
    const [validation, setValidation] = useState<Validation>({
        title: undefined,
        body: undefined,
    })
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)

    const [editThankYou, { loading: formLoading }] = useMutation(EDIT_THANK_YOU)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!title || !body) {
            setValidation({
                title: !title ? "not-passed" : undefined,
                body: !body ? "not-passed" : undefined,
            })

            return
        }

        const thankYouInput = {
            title,
            body,
            _id: page?._id,
        }

        editThankYou({
            variables: {
                thankYouInput,
            },

            refetchQueries: [
                {
                    query: GET_THANK_YOU,
                },
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
                toast("Thank you page was edited!", {
                    icon: <CheckCircle />,
                })
            }
        })
    }

    return (
        <PageDashboard
            title="Edit thank you page"
            role="admin"
            back="/dashboard/contact"
            error={error?.message || contactError?.message}
            isLoading={loading || contactLoading}
        >
            <Text tag="h1">Edit thank you page</Text>
            
            {!contactPage?.hideContact ? (
                <>
                    <Form
                        buttonPrimary="Save changes"
                        buttonSecondary={{
                            text: "Cancel",
                            to: "/dashboard/contact",
                        }}
                        isLoading={formLoading}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            id="title"
                            label="Title"
                            value={title}
                            onChange={handleTitle}
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
                            id="body"
                            label="Body"
                            value={body}
                            setValue={setBody}
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
                            preview="edit"
                            backgroundColor="light"
                        />
                    </Form>

                    {errorMessages && <ErrorMessages errors={errorMessages} />}
                </>
            ) : (
                <Text>
                    The contact page is hidden, you can not edit this page.{" "}
                    <Link to="/dashboard/contact">Back to dashboard.</Link>
                </Text>
            )}
        </PageDashboard>
    )
}

export default EditThankYou

type Validation = {
    title: ComponentProps.ValidationStatusProps
    body: ComponentProps.ValidationStatusProps
}
