/*=============================================== GlobalData ===============================================*/

import React, { useContext, useState } from "react"
import { Text, Form, Input } from "tsx-library-julseb"
import { GraphQLErrors } from "@apollo/client/errors"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"

import { GlobalContext, GlobalContextType } from "../../context/global"

import PageDashboard from "../../components/dashboard/PageDashboard"
import ImageUploader from "../../components/dashboard/ImageUploader"
import ErrorMessages from "../../components/ErrorMessages"
import CheckCircle from "../../components/icons/CheckCircle"

import { GLOBAL_DATA } from "../../graphql/queries"
import { EDIT_GLOBAL } from "../../graphql/mutations"

const GlobalData = () => {
    const { globalData } = useContext(GlobalContext) as GlobalContextType

    const [hasEdits, setHasEdits] = useState(false)

    const [inputs, setInputs] = useState({
        name: globalData?.name,
        baseline: globalData?.baseline,
        email: globalData?.email,
        metaDescription: globalData?.metaDescription,
        keywords: globalData?.keywords,
        language: globalData?.language,
    })
    const [favicon, setFavicon] = useState(globalData?.favicon)
    const [cover, setCover] = useState(globalData?.cover)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState<
        undefined | GraphQLErrors
    >(undefined)

    const handleInputs = (
        e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
    ) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

        if (!hasEdits) {
            setHasEdits(true)
        }
    }

    const [editGlobal, { loading }] = useMutation(EDIT_GLOBAL)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let inputsKeywords = inputs.keywords?.includes(",")
            ? inputs.keywords?.toString().split(",")
            : inputs.keywords

        if (!Array.isArray(inputsKeywords)) {
            inputsKeywords = [inputsKeywords || ""]
        }

        const globalInput = {
            _id: globalData?._id,
            name: inputs.name,
            baseline: inputs.baseline,
            metaDescription: inputs.metaDescription,
            favicon,
            email: inputs.email,
            cover,
            keywords: inputsKeywords,
            language: inputs.language,
        }

        if (globalData?._id) {
            editGlobal({
                variables: {
                    globalInput: {
                        ...globalInput,
                    },
                },

                refetchQueries: [{ query: GLOBAL_DATA }],

                onError: ({ graphQLErrors }) => {
                    setErrorMessages(graphQLErrors)
                    return
                },
            }).then(() => {
                setHasEdits(false)
                toast("Global data was edited!", { icon: <CheckCircle /> })
            })
        } else {
            console.log("ID is missing")
        }
    }

    return (
        <PageDashboard title="Global data" role="admin">
            <Text tag="h1">Edit global data</Text>

            <Form
                buttonPrimary="Save changes"
                disabled={!hasEdits}
                isLoading={isLoading || loading}
                onSubmit={handleSubmit}
            >
                <Input
                    id="name"
                    label="Site name"
                    value={inputs.name}
                    onChange={handleInputs}
                />

                <Input
                    id="baseline"
                    label="Baseline"
                    value={inputs.baseline}
                    onChange={handleInputs}
                />

                <Input
                    id="email"
                    label="Email"
                    value={inputs.email}
                    onChange={handleInputs}
                    type="email"
                />

                <Input
                    id="metaDescription"
                    label="Meta description"
                    value={inputs.metaDescription}
                    onChange={handleInputs}
                    type="textarea"
                />

                <Input
                    id="language"
                    label="Site language"
                    value={inputs.language}
                    onChange={handleInputs}
                />

                <ImageUploader
                    imageUrl={favicon || ""}
                    setImageUrl={setFavicon}
                    setIsLoading={setIsLoading}
                    label="Favicon"
                    setHasEdits={setHasEdits}
                />

                <ImageUploader
                    id="cover"
                    imageUrl={cover || ""}
                    setImageUrl={setCover}
                    setIsLoading={setIsLoading}
                    label="Homepage cover"
                    cover
                    setHasEdits={setHasEdits}
                />

                <Input
                    id="keywords"
                    label="Keywords"
                    value={inputs.keywords}
                    onChange={handleInputs}
                />
            </Form>

            {errorMessages && <ErrorMessages errors={errorMessages} />}
        </PageDashboard>
    )
}

export default GlobalData
