/*=============================================== PageForm ===============================================*/

import React, { useState } from "react"
import {
    Form,
    Input,
    MarkdownEditor,
    InputCheck,
    ComponentProps,
} from "tsx-library-julseb"
import { slugify } from "../../utils"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import ErrorMessages from "../ErrorMessages"
import CheckCircle from "../icons/CheckCircle"

import { PageType } from "../../types"

import { ALL_PAGES } from "../../graphql/queries"
import { NEW_PAGE, EDIT_PAGE } from "../../graphql/mutations"

const PageForm = ({ page }: Props) => {
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        title: page ? page?.title : "",
        slug: page ? page?.slug : "",
        metaDescription: page ? page?.metaDescription : "",
        keywords: page ? page?.keywords : "",
        draft: page ? page?.draft : false,
    })
    const [body, setBody] = useState(page ? page?.body : "")
    const [validation, setValidation] = useState<ValidationProps>({
        title: undefined,
        slug: undefined,
        metaDescription: undefined,
        body: undefined,
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

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            title: e.target.value,
            slug: slugify(e.target.value),
        })

    const handleCheckInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.checked,
        })

    const [newPage, { loading }] = useMutation(NEW_PAGE)
    const [editPage, { loading: editLoading }] = useMutation(EDIT_PAGE)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!inputs.title || !inputs.slug || !inputs.metaDescription || !body) {
            setValidation({
                title: !inputs.title ? "not-passed" : undefined,
                slug: !inputs.slug ? "not-passed" : undefined,
                metaDescription: !inputs.metaDescription
                    ? "not-passed"
                    : undefined,
                body: !body ? "not-passed" : undefined,
            })

            return
        }

        let inputsKeywords = inputs.keywords.includes(",")
            ? inputs.keywords.split(",")
            : inputs.keywords

        if (!Array.isArray(inputsKeywords)) {
            inputsKeywords = [inputsKeywords]
        }

        const requestNew = {
            title: inputs.title,
            slug: inputs.slug,
            body,
            metaDescription: inputs.metaDescription,
            keywords: [inputs.title, ...inputsKeywords],
            draft: inputs.draft,
        }

        const requestEdit = {
            ...requestNew,
            _id: page?._id,
        }

        page
            ? editPage({
                  variables: {
                      editPageInput: {
                          ...requestEdit,
                      },
                  },
                  refetchQueries: [
                      {
                          query: ALL_PAGES,
                      },
                  ],
                  onError: ({ graphQLErrors }) => {
                      setErrorMessages(graphQLErrors)
                      return
                  },
              }).then(res => {
                  if (!res.errors) {
                      navigate("/dashboard/pages")
                      toast(`${inputs.title} was edited!`, {
                          icon: <CheckCircle />,
                      })
                  }
              })
            : newPage({
                  variables: {
                      newPageInput: { ...requestNew },
                  },
                  refetchQueries: [
                      {
                          query: ALL_PAGES,
                      },
                  ],
                  onError: ({ graphQLErrors }) => {
                      setErrorMessages(graphQLErrors)
                      return
                  },
              }).then(res => {
                  if (!res.errors) {
                      navigate("/dashboard/pages")
                      toast(`${inputs.title} was added!`, {
                          icon: <CheckCircle />,
                      })
                  }
              })
    }

    return (
        <>
            <Form
                buttonPrimary={page ? "Save changes" : "Create a new page"}
                buttonSecondary={{ text: "Cancel", to: "/dashboard/pages" }}
                onSubmit={handleSubmit}
                isLoading={loading || editLoading}
            >
                <Input
                    id="title"
                    label="Title"
                    value={inputs.title}
                    onChange={handleTitle}
                    helperBottom={{
                        text: validation.title
                            ? "Title is required"
                            : undefined,
                        icon: validation.title ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                    validation={{
                        status: validation.title,
                    }}
                />

                <Input
                    id="slug"
                    label="Slug"
                    value={inputs.slug}
                    onChange={handleInputs}
                    helperBottom={{
                        text: validation.slug ? "Slug is required" : undefined,
                        icon: validation.slug ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                    validation={{
                        status: validation.slug,
                    }}
                />

                <Input
                    id="metaDescription"
                    label="Meta description"
                    value={inputs.metaDescription}
                    onChange={handleInputs}
                    type="textarea"
                    maxLength={140}
                    counter
                    helperBottom={{
                        text: validation.metaDescription
                            ? "Meta description is required"
                            : undefined,
                        icon: validation.metaDescription
                            ? "close-circle"
                            : undefined,
                        iconColor: "danger",
                    }}
                    validation={{
                        status: validation.metaDescription,
                    }}
                />

                <Input
                    id="keywords"
                    label="Keywords"
                    value={inputs.keywords}
                    onChange={handleInputs}
                    helperBottom="Please separate all keywords with a comma"
                />

                <MarkdownEditor
                    id="body"
                    value={body}
                    setValue={setBody}
                    preview="edit"
                    backgroundColor="light"
                    helperBottom={{
                        text: validation.body ? "Body is required" : undefined,
                        icon: validation.body ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                    validation={validation.body}
                />

                <InputCheck
                    id="draft"
                    label="Add to drafts"
                    type="checkbox"
                    checkStyle="toggle"
                    defaultChecked={inputs.draft}
                    onChange={handleCheckInputs}
                />
            </Form>
            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </>
    )
}

export default PageForm

interface Props {
    page?: PageType
}

type ValidationProps = {
    title: ComponentProps.ValidationStatusProps
    slug: ComponentProps.ValidationStatusProps
    metaDescription: ComponentProps.ValidationStatusProps
    body: ComponentProps.ValidationStatusProps
}
