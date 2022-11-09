/*=============================================== NewPost ===============================================*/

import React, { useState, useContext } from "react"
import {
    Form,
    Input,
    MarkdownEditor,
    InputCheck,
    Grid,
    Button,
    ComponentProps,
} from "tsx-library-julseb"
import { useMutation, useQuery } from "@apollo/client"
import { slugify, unslugify } from "../../utils"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { AuthContext, AuthContextType } from "../../context/auth"

import ImageUploader from "./ImageUploader"
import ErrorMessages from "../ErrorMessages"
import CheckCircle from "../icons/CheckCircle"
import AddCategory from "./AddCategory"

import { NEW_POST, EDIT_POST } from "../../graphql/mutations"
import { ALL_CATEGORIES, POSTS_DASHBOARD } from "../../graphql/queries"
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
        category: post ? `${post.category._id} ${post.tags[1]}` : "none",
        categoryName: post ? post.category.name : "none",
    })
    const [body, setBody] = useState(post ? post.body : "")
    const [imageUrl, setImageUrl] = useState(post ? post.imageUrl : "")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const [validation, setValidation] = useState<ValidationProps>({
        title: undefined,
        metaDescription: undefined,
        slug: undefined,
        category: undefined,
        body: undefined,
        imageUrl: undefined,
    })

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

    const [newPost, { loading }] = useMutation(NEW_POST)
    const [editPost, { loading: editLoading }] = useMutation(EDIT_POST)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            !inputs.title ||
            !inputs.metaDescription ||
            !inputs.slug ||
            inputs.category === "none" ||
            !body ||
            !imageUrl
        ) {
            setValidation({
                title: !inputs.title ? "not-passed" : undefined,
                metaDescription: !inputs.metaDescription
                    ? "not-passed"
                    : undefined,
                slug: !inputs.slug ? "not-passed" : undefined,
                category: inputs.category === "none" ? "not-passed" : undefined,
                body: !body ? "not-passed" : undefined,
                imageUrl: !imageUrl ? "not-passed" : undefined,
            })

            return
        }

        let inputsTags = inputs.tags.includes(",")
            ? inputs.tags.split(",")
            : inputs.tags

        if (!Array.isArray(inputsTags)) {
            inputsTags = [inputsTags]
        }

        const categoryId = inputs.category.split(" ")[0]
        const categoryName = inputs.category.split(" ")[1]

        const baseInputs = {
            title: inputs.title,
            tags: [inputs.title, categoryName, ...inputsTags],
            draft: inputs.draft,
            metaDescription: inputs.metaDescription,
            featured: inputs.featured,
            slug: inputs.slug,
            category: categoryId,
            body,
            imageUrl,
        }

        const newPostInput = {
            ...baseInputs,
            author: user?._id,
        }

        const editPostInput = {
            ...baseInputs,
            _id: post?._id,
        }

        const saveNewPost = () =>
            newPost({
                variables: {
                    newPostInput: {
                        ...newPostInput,
                    },
                },

                refetchQueries: [
                    {
                        query: POSTS_DASHBOARD,
                    },
                ],

                onError: ({ graphQLErrors }) => {
                    setErrorMessages(graphQLErrors)
                    return
                },
            }).then(res => {
                if (!res.errors) {
                    navigate("/dashboard")
                    toast(`You successfully added ${inputs.title}`, {
                        icon: <CheckCircle />,
                    })
                }
            })

        const saveEditPost = () =>
            editPost({
                variables: {
                    editPostInput: {
                        ...editPostInput,
                    },
                },

                refetchQueries: [
                    {
                        query: POSTS_DASHBOARD,
                    },
                ],

                onError: ({ graphQLErrors }) => {
                    setErrorMessages(graphQLErrors)
                    return
                },
            }).then(res => {
                if (!res.errors) {
                    toast(`You successfully updated ${inputs.title}!`, {
                        icon: <CheckCircle />,
                    })
                    navigate("/dashboard")
                }
            })

        return post ? saveEditPost() : saveNewPost()
    }

    const [isCategoryOpen, setIsCategoryOpen] = useState(false)

    return (
        <>
            <Form
                buttonPrimary={post ? "Update post" : "Create a new post"}
                buttonSecondary={{ text: "Cancel", to: "/dashboard" }}
                isLoading={
                    loading || isLoading || categoriesLoading || editLoading
                }
                onSubmit={handleSubmit}
            >
                <Input
                    id="title"
                    label="Title"
                    onChange={handleTitle}
                    value={inputs.title}
                    helperBottom={{
                        text: validation.title
                            ? "Title is required"
                            : undefined,
                        icon: validation.title ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                    validation={{ status: validation.title }}
                />

                <Input
                    id="slug"
                    label="Slug"
                    onChange={handleInputs}
                    value={inputs.slug}
                    helperBottom={{
                        text: validation.slug ? "Slug is required" : undefined,
                        icon: validation.slug ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                    validation={{ status: validation.slug }}
                />

                <Grid gap="xs">
                    <Input
                        id="category"
                        label="Category"
                        value={inputs.category}
                        onChange={handleInputs}
                        type="select"
                        helperBottom={{
                            text: validation.category
                                ? "Category is required"
                                : undefined,
                            icon: validation.category
                                ? "close-circle"
                                : undefined,
                            iconColor: "danger",
                        }}
                    >
                        <option value="none">---</option>

                        {categories?.map(category => (
                            <option
                                value={`${category._id} ${category.name}`}
                                key={category._id}
                            >
                                {unslugify(category.name)}
                            </option>
                        ))}
                    </Input>

                    {isCategoryOpen ? (
                        <AddCategory setIsOpen={setIsCategoryOpen} isPostForm />
                    ) : (
                        <Button
                            style={{ justifySelf: "start" }}
                            onClick={() => setIsCategoryOpen(true)}
                        >
                            Add a new category
                        </Button>
                    )}
                </Grid>

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
                    helperBottom={{
                        text: validation.metaDescription
                            ? "Meta description is required"
                            : undefined,
                        icon: validation.metaDescription
                            ? "close-circle"
                            : undefined,
                        iconColor: "danger",
                    }}
                    validation={{ status: validation.metaDescription }}
                />

                <ImageUploader
                    label="Cover"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    setIsLoading={setIsLoading}
                    cover
                    helperBottom={{
                        text: validation.imageUrl
                            ? "Cover is required"
                            : undefined,
                        icon: validation.imageUrl ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                    validation={validation.imageUrl}
                />

                <MarkdownEditor
                    value={body}
                    setValue={setBody}
                    id="body"
                    label="Body"
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

type ValidationProps = {
    title: ComponentProps.ValidationStatusProps
    metaDescription: ComponentProps.ValidationStatusProps
    slug: ComponentProps.ValidationStatusProps
    category: ComponentProps.ValidationStatusProps
    body: ComponentProps.ValidationStatusProps
    imageUrl: ComponentProps.ValidationStatusProps
}
