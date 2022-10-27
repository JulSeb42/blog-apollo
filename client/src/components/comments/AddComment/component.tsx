/*=============================================== AddComment component ===============================================*/

import React, { useState, useContext } from "react"
import { Button, Form, Input } from "tsx-library-julseb"
import { useMutation } from "@apollo/client"

import { AuthContext, AuthContextType } from "../../../context/auth"

import { AddCommentProps } from "./types"

import { NEW_COMMENT } from "../../../graphql/mutations"
import { GET_POST, USER_BY_TOKEN } from "../../../graphql/queries"

const AddComment = ({ post: { slug, _id } }: AddCommentProps) => {
    const { isLoggedIn, user } = useContext(AuthContext) as AuthContextType

    const [isOpen, setIsOpen] = useState(false)

    const errorPoster = "Your name can not be empty."
    const errorBody = "Your comment can not be empty."

    const [inputs, setInputs] = useState({
        poster: isLoggedIn ? user?.fullName : "",
        body: "",
    })
    const [errors, setErrors] = useState<any>({
        poster: undefined,
        body: undefined,
    })
    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
    ) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

        if (errors.poster || errors.body) {
            if (e.target.id === "poster" && e.target.value.length > 0) {
                setErrors({
                    ...errors,
                    poster: undefined,
                })
            } else if (
                e.target.id === "poster" &&
                e.target.value.length === 0
            ) {
                setErrors({
                    ...errors,
                    poster: errorPoster,
                })
            }

            if (e.target.id === "body" && e.target.value.length > 0) {
                setErrors({
                    ...errors,
                    body: undefined,
                })
            } else if (e.target.id === "body" && e.target.value.length === 0) {
                setErrors({
                    ...errors,
                    body: errorBody,
                })
            }
        }
    }

    const close = () => {
        setInputs({
            poster: isLoggedIn ? user?.fullName : "",
            body: "",
        })
        setErrors({
            poster: undefined,
            body: undefined,
        })
        setIsOpen(false)
    }

    const [newComment, { loading }] = useMutation(NEW_COMMENT)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!inputs.body || !inputs.poster) {
            setErrors({
                poster: !inputs.poster && errorPoster,
                body: !inputs.body && errorBody,
            })

            return
        }

        newComment({
            variables: {
                newCommentInput: {
                    ...inputs,
                    post: _id,
                },
            },
            refetchQueries: [
                {
                    query: GET_POST,
                    variables: {
                        slug,
                    },
                },
            ],
        })

        close()
    }

    return (
        <>
            {!isOpen && (
                <Button onClick={() => setIsOpen(true)}>Add comment</Button>
            )}

            {isOpen && (
                <Form
                    buttonPrimary="Post your comment"
                    buttonSecondary={{ text: "Cancel", onClick: close }}
                    onSubmit={handleSubmit}
                    isLoading={loading}
                >
                    <Input
                        id="poster"
                        label="Your name"
                        value={inputs.poster}
                        onChange={handleInputs}
                        helperBottom={{
                            text: errors.poster ? errors.poster : undefined,
                            icon: errors.poster ? "close-circle" : undefined,
                            iconColor: "danger",
                        }}
                        disabled={isLoggedIn}
                    />

                    <Input
                        id="body"
                        label="Your comment"
                        type="textarea"
                        value={inputs.body}
                        onChange={handleInputs}
                        helperBottom={{
                            text: errors.body ? errors.body : undefined,
                            icon: errors.body ? "close-circle" : undefined,
                            iconColor: "danger",
                        }}
                    />
                </Form>
            )}
        </>
    )
}

export default AddComment
