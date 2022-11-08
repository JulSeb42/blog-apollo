/*=============================================== AddCategory component ===============================================*/

import React, { useState } from "react"
import { Input, Button } from "tsx-library-julseb"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { slugify } from "../../../utils"
import toast from "react-hot-toast"

import ErrorMessages from "../../ErrorMessages"
import CheckCircle from "../../icons/CheckCircle"

import { NEW_CATEGORY } from "../../../graphql/mutations"
import { ALL_CATEGORIES } from "../../../graphql/queries"

import * as Styles from "./styles"

const AddCategory = ({ isSetup }: Props) => {
    const [category, setCategory] = useState("")
    const [error, setError] = useState<undefined | string>(undefined)
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) =>
        setCategory(e.target.value)

    const [newCategory, { loading }] = useMutation(NEW_CATEGORY)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (category === "") {
            setError("The category name can not be empty.")
            return
        }

        newCategory({
            variables: {
                newCategoryInput: {
                    name: slugify(category),
                },
            },

            refetchQueries: [
                {
                    query: ALL_CATEGORIES,
                },
            ],

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },
        }).then(() => {
            setCategory("")

            if (!isSetup) {
                toast(`${category} was successfully added!`, {
                    icon: <CheckCircle />,
                })
            }
        })
    }

    return (
        <>
            <Styles.StyledAddCategory
                onSubmit={handleSubmit}
                $hasError={!!error}
            >
                <Input
                    id="category"
                    label="Add category"
                    value={category}
                    onChange={handleCategory}
                    helperBottom={{
                        text: error ? error : undefined,
                        icon: error ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                />

                <Button type="submit" isLoading={loading}>
                    Add a new category
                </Button>
            </Styles.StyledAddCategory>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </>
    )
}

export default AddCategory

interface Props {
    isSetup?: boolean
}
