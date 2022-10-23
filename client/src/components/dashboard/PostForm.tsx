/*=============================================== NewPost ===============================================*/

import React, { useState, useContext } from "react"
import { Form, Input, MarkdownEditor, InputCheck } from "tsx-library-julseb"
import { useMutation, useQuery } from "@apollo/client"
import { slugify, unslugify } from "../../utils"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import ImageUploader from "./ImageUploader"
import ErrorMessages from "../ErrorMessages"

import { NEW_POST } from "../../graphql/mutations"
import { ALL_CATEGORIES } from "../../graphql/queries"
import { PostType, CategoryType } from "../../types"

const PostForm = ({ post }: Props) => {
    const { user } = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()

    const {
        data,
        loading: categoriesLoading,
        error: categoriesError,
    } = useQuery(ALL_CATEGORIES)
    const categories: CategoryType[] = data?.categories

    if (categoriesError) console.log(categoriesError)

    const [inputs, setInputs] = useState({
        title: post ? post.title : "",
        tags: post ? post.tags.toString() : "",
        draft: post ? post.draft : false,
        metaDescription: post ? post.metaDescription : "",
        featured: post ? post.featured : false,
        slug: post ? post.slug : "",
        category: post
            ? post.category._id
            : !categoriesLoading && categories[0]?._id,
        categoryName: post
            ? post.category.name
            : !categoriesLoading && categories[0]?.name,
    })
    const [body, setBody] = useState(post ? post.body : "")
    const [imageUrl, setImageUrl] = useState(post ? post.imageUrl : "")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            title: e.target.value,
            slug: slugify(e.target.value),
        })

    const handleInputs = (
        e: React.ChangeEvent<
            HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement
        >
    ) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleCheckInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.checked,
        })

    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setInputs({
            ...inputs,
            category: e.target.value,
            // @ts-expect-error
            categoryName: e.target.textContent,
        })

    const [newPost, { loading }] = useMutation(NEW_POST)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const inputsTags = inputs.tags.includes(",")
            ? inputs.tags.split(",")
            : inputs.tags

        const tags = [inputs.title, inputs.categoryName, ...inputsTags]

        const newPostInput = {
            title: inputs.title,
            tags: tags,
            draft: inputs.draft,
            metaDescription: inputs.metaDescription,
            featured: inputs.featured,
            slug: inputs.slug,
            category: inputs.category,
            body,
            imageUrl,
            author: user?._id,
        }

        newPost({
            variables: {
                newPostInput: {
                    ...newPostInput,
                },
            },
            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
            },
        }).then(() => navigate("/dashboard"))
    }

    return (
        <>
            <Form
                buttonPrimary={post ? "Update post" : "Create a new post"}
                buttonSecondary={{ text: "Cancel", to: "/dashboard" }}
                isLoading={loading || isLoading || categoriesLoading}
                onSubmit={handleSubmit}
            >
                <Input
                    id="title"
                    label="Title"
                    onChange={handleTitle}
                    value={inputs.title}
                />

                <Input
                    id="slug"
                    label="Slug"
                    onChange={handleInputs}
                    value={inputs.slug}
                />

                <Input
                    id="category"
                    label="Category"
                    value={inputs.category}
                    onChange={handleCategory}
                    type="select"
                >
                    {categories?.map(category => (
                        <option value={category._id} key={category._id}>
                            {unslugify(category.name)}
                        </option>
                    ))}
                </Input>

                <Input
                    id="tags"
                    label="Tags"
                    onChange={handleInputs}
                    value={inputs.tags}
                    helperBottom="Separate all the tags with a comma"
                />

                <Input
                    id="metaDescription"
                    label="Meta description"
                    type="textarea"
                    onChange={handleInputs}
                    value={inputs.metaDescription}
                    maxLength={160}
                    counter
                />

                <ImageUploader
                    label="Cover"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    setIsLoading={setIsLoading}
                    cover
                />

                <MarkdownEditor
                    value={body}
                    setValue={setBody}
                    id="body"
                    label="Body"
                    preview="edit"
                    backgroundColor="light"
                />

                <InputCheck
                    id="featured"
                    label="Feature this post"
                    type="checkbox"
                    checkStyle="toggle"
                    defaultChecked={inputs.featured}
                    onChange={handleCheckInputs}
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

export default PostForm

interface Props {
    post?: PostType
}
