/*=============================================== ProfileForm ===============================================*/

import React, { useContext, useState } from "react"
import { Form, Input } from "tsx-library-julseb"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"

import { AuthContext, AuthContextType } from "../../context/auth"

import ImageUploader from "./ImageUploader"
import ErrorMessages from "../ErrorMessages"

import { EDIT_USER } from "../../graphql/mutations"

const ProfileForm = ({ edit }: Props) => {
    const { user, setUser } = useContext(AuthContext) as AuthContextType

    const [inputs, setInputs] = useState({
        fullName: edit ? user?.fullName : "",
        email: edit ? user?.email : "",
        bio: edit ? user?.bio : "",
    })
    const [imageUrl, setImageUrl] = useState(edit ? user?.imageUrl : "")
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState<
        GraphQLErrors | undefined
    >(undefined)

    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
    ) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const [editUser, { loading }] = useMutation(EDIT_USER)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (user?._id) {
            editUser({
                variables: {
                    editUserInput: {
                        fullName: inputs.fullName,
                        bio: inputs.bio,
                        imageUrl,
                        _id: user?._id,
                    },
                },

                onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
            }).then(res => {
                const user = res.data.editUser
                setUser(user)
            })
        } else {
            console.log("No user id")
        }
    }

    return (
        <>
            <Form
                buttonPrimary={edit ? "Save changes" : "Save new user"}
                isLoading={isLoading || loading}
                onSubmit={handleSubmit}
            >
                <Input
                    id="fullName"
                    label="Full name"
                    value={inputs.fullName}
                    onChange={handleInputs}
                />

                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={inputs.email}
                    onChange={handleInputs}
                    disabled={edit}
                />

                <Input
                    id="bio"
                    label="Bio"
                    type="textarea"
                    value={inputs.bio}
                    onChange={handleInputs}
                />

                <ImageUploader
                    label="Profile picture"
                    imageUrl={imageUrl || ""}
                    setImageUrl={setImageUrl}
                    setIsLoading={setIsLoading}
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </>
    )
}

export default ProfileForm

interface Props {
    edit?: boolean
}
