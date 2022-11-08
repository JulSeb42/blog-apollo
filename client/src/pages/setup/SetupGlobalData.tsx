/*=============================================== SetupGlobalData ===============================================*/

import React, { useState, useContext } from "react"
import { Text, Form, Input, ComponentProps } from "tsx-library-julseb"
import { useMutation } from "@apollo/client"
import { GraphQLErrors } from "@apollo/client/errors"
import { useNavigate, Navigate } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"
import { GlobalContext, GlobalContextType } from "../../context/global"

import PageSetup from "../../components/layouts/PageSetup"
import ImageUploader from "../../components/dashboard/ImageUploader"
import ErrorMessages from "../../components/ErrorMessages"

import { CREATE_GLOBAL } from "../../graphql/mutations"
import { GLOBAL_DATA } from "../../graphql/queries"

const SetupGlobalData = () => {
    const { user, isLoading: userLoading } = useContext(
        AuthContext
    ) as AuthContextType
    const { globalData } = useContext(GlobalContext) as GlobalContextType
    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        name: "Apollo Blog",
        baseline: "GraphQL is awesome!",
        // language: navigator.language,
        language: "en",
    })
    // const [cover, setCover] = useState(
    //     "https://source.unsplash.com/random/1200x800?city,object,code"
    // )
    const [cover, setCover] = useState(
        "https://res.cloudinary.com/dyfxmafvr/image/upload/v1667905043/blog-apollo/iwttrjct1m6e2wiw4n74.jpg"
    )
    const [favicon, setFavicon] = useState(
        "https://res.cloudinary.com/dyfxmafvr/image/upload/v1666960211/blog-apollo/nrtirubrwcxdbutbrrzm.ico"
    )
    const [isLoading, setIsLoading] = useState(false)
    const [validation, setValidation] = useState<Validation>({
        name: undefined,
        language: undefined,
    })
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const [createGlobal, { loading }] = useMutation(CREATE_GLOBAL)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!inputs.name || !inputs.language) {
            setValidation({
                name: !inputs.name ? "not-passed" : undefined,

                language: !inputs.language ? "not-passed" : undefined,
            })

            return
        }

        createGlobal({
            variables: {
                createGlobalInput: {
                    ...inputs,
                    cover,
                    favicon,
                    email: user?.email,
                },
            },

            onError: ({ graphQLErrors }) => {
                setErrorMessages(graphQLErrors)
                return
            },

            refetchQueries: [
                {
                    query: GLOBAL_DATA,
                },
            ],
        }).then(res => {
            if (!res.errors) {
                navigate("/setup/create-users")
            }
        })
    }

    if (globalData?.isGlobalSetup) return <Navigate to="/setup/create-users" />

    return (
        <PageSetup
            title="Create global data"
            active={1}
            isLoading={userLoading}
        >
            <Text>Now, tell us more about your new blog:</Text>

            <Form
                buttonPrimary="Save"
                isLoading={isLoading || loading}
                onSubmit={handleSubmit}
            >
                <Input
                    id="name"
                    label="Name of the blog"
                    value={inputs.name}
                    onChange={handleInputs}
                    validation={{ status: validation.name }}
                    helperBottom={{
                        text: validation.name ? "Name is required" : undefined,
                        icon: validation.name ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                />

                <Input
                    id="baseline"
                    label="Baseline"
                    value={inputs.baseline}
                    onChange={handleInputs}
                />

                <Input
                    id="language"
                    label="Language"
                    value={inputs.language}
                    onChange={handleInputs}
                    validation={{ status: validation.name }}
                    helperBottom={{
                        text: validation.language
                            ? "Language is required"
                            : undefined,
                        icon: validation.language ? "close-circle" : undefined,
                        iconColor: "danger",
                    }}
                />

                <ImageUploader
                    imageUrl={favicon || ""}
                    setImageUrl={setFavicon}
                    setIsLoading={setIsLoading}
                    label="Favicon"
                />

                <ImageUploader
                    id="cover"
                    imageUrl={cover || ""}
                    setImageUrl={setCover}
                    setIsLoading={setIsLoading}
                    label="Homepage cover"
                    cover
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </PageSetup>
    )
}

export default SetupGlobalData

type Validation = {
    name: ComponentProps.ValidationStatusProps
    language: ComponentProps.ValidationStatusProps
}
