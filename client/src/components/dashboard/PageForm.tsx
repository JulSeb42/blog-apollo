/*=============================================== PageForm ===============================================*/

import React, { useState } from "react"
import { Form, Input, MarkdownEditor, InputCheck } from "tsx-library-julseb"
import { slugify } from "../../utils"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"

import ErrorMessages from "../ErrorMessages"

import { PageType } from "../../types"

import { ALL_PAGES } from "../../graphql/queries"
import { NEW_PAGE } from "../../graphql/mutations"

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
            [e.target.value]: e.target.checked,
        })

    const [newPage, { loading }] = useMutation(NEW_PAGE)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

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
            keywords: [...inputs.title, ...inputsKeywords],
            draft: inputs.draft,
        }

        // const requestEdit = {
        //     ...requestNew,
        //     _id: page?._id,
        // }

        newPage({
            variables: {
                newPageInput: { ...requestNew },
            },
            refetchQueries: [{ query: ALL_PAGES }],
            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },
        }).then(res => {
            if (!res.errors) {
                navigate("/dashboard/pages")
            }
        })
    }

    return (
        <>
            {" "}
            <Form
                buttonPrimary={page ? "Save changes" : "Create a new page"}
                buttonSecondary={{ text: "Cancel", to: "/dashboard/pages" }}
                onSubmit={handleSubmit}
                isLoading={loading}
            >
                <Input
                    id="title"
                    label="Title"
                    value={inputs.title}
                    onChange={handleTitle}
                />

                <Input
                    id="slug"
                    label="Slug"
                    value={inputs.slug}
                    onChange={handleInputs}
                />

                <Input
                    id="metaDescription"
                    label="Meta description"
                    value={inputs.metaDescription}
                    onChange={handleInputs}
                    type="textarea"
                    maxLength={140}
                    counter
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
                />

                <InputCheck
                    id="draft"
                    label="Add to drafts"
                    type="checkbox"
                    checkStyle="toggle"
                    onChange={handleCheckInputs}
                    defaultChecked={inputs.draft}
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
