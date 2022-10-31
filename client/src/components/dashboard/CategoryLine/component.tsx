/*=============================================== CategoryLine component ===============================================*/

import React, { useState } from "react"
import {
    ButtonIcon,
    Flexbox,
    Text,
    Input,
    Button,
    Alert,
} from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { slugify, unslugify } from "../../../utils"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"

import CheckCircle from "../../icons/CheckCircle"

import * as Styles from "./styles"
import { CategoryLineProps } from "./types"

import { UPDATE_CATEGORY, DELETE_CATEGORY } from "../../../graphql/mutations"
import { ALL_CATEGORIES } from "../../../graphql/queries"

const CategoryLine = ({ category: { name, _id } }: CategoryLineProps) => {
    const [editMode, setEditMode] = useState(false)

    const [input, setInput] = useState(name)
    const [error, setError] = useState<undefined | string>(undefined)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInput(e.target.value)

    const close = () => {
        setEditMode(false)
        setInput(name)
    }

    const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (input === "") {
            setError("The category name can not be empty.")
            return
        }

        updateCategory({
            variables: {
                updateCategoryInput: {
                    name: slugify(input),
                    _id,
                },
            },

            refetchQueries: [
                {
                    query: ALL_CATEGORIES,
                },
            ],
        }).then(res => {
            if (!res.errors) {
                close()
                toast(`You successfully updated ${name}!`, {
                    icon: <CheckCircle />,
                })
            }
        })
    }

    const [isOpen, setIsOpen] = useState(false)

    const [deleteCategory, { loading: deleteLoading }] =
        useMutation(DELETE_CATEGORY)

    const handleDelete = () => {
        deleteCategory({
            variables: {
                _id,
            },

            refetchQueries: [
                {
                    query: ALL_CATEGORIES,
                },
            ],
        }).then(() => {
            setIsOpen(false)
            toast(`You successfully deleted ${name}!`, {
                icon: <CheckCircle />,
            })
        })
    }

    return (
        <Styles.StyledCategoryLine>
            <Styles.Content>
                {editMode ? (
                    <Styles.Form onSubmit={handleSubmit}>
                        <Input
                            id={`edit-category-${_id}`}
                            value={input}
                            onChange={handleInput}
                            helperBottom={{
                                text: error,
                                icon: error ? "close-circle" : undefined,
                                iconColor: "danger",
                            }}
                        />

                        <Button type="submit" style={{ height: 32 }}>
                            Update category
                        </Button>
                    </Styles.Form>
                ) : (
                    <Text tag="h6">
                        <Link
                            to={`/categories/${slugify(name)}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {unslugify(name)}
                        </Link>
                    </Text>
                )}

                <Flexbox gap="xs">
                    <ButtonIcon
                        icon={editMode ? "close-circle" : "edit"}
                        size={24}
                        variant="transparent"
                        type="button"
                        onClick={() =>
                            editMode ? close() : setEditMode(!editMode)
                        }
                        isLoading={loading}
                    />

                    <ButtonIcon
                        icon="trash"
                        size={24}
                        variant="transparent"
                        color="danger"
                        type="button"
                        isLoading={loading}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </Flexbox>
            </Styles.Content>

            {isOpen && (
                <Alert color="danger">
                    <Text>Are you sure you want to delete {name}?</Text>

                    <Flexbox gap="xs">
                        <Button
                            color="danger"
                            onClick={handleDelete}
                            isLoading={deleteLoading}
                        >
                            Yes, delete this category
                        </Button>

                        <Button variant="text" onClick={() => setIsOpen(false)}>
                            No, cancel
                        </Button>
                    </Flexbox>
                </Alert>
            )}
        </Styles.StyledCategoryLine>
    )
}

export default CategoryLine
