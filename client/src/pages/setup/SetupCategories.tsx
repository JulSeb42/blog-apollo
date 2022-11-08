/*=============================================== SetupCategories ===============================================*/

import React, { useContext } from "react"
import { Text, Button } from "tsx-library-julseb"
import { useQuery, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"

import { GlobalContext, GlobalContextType } from "../../context/global"

import PageSetup from "../../components/layouts/PageSetup"
import AddCategory from "../../components/dashboard/AddCategory"
import ListCards from "../../components/dashboard/ListCards"
import CategoryLine from "../../components/dashboard/CategoryLine"

import { ALL_CATEGORIES } from "../../graphql/queries"
import { SETUP_GLOBAL } from "../../graphql/mutations"
import { CategoryType } from "../../types"

const SetupCategories = () => {
    const navigate = useNavigate()

    const { globalData } = useContext(GlobalContext) as GlobalContextType

    const { data, error, loading } = useQuery(ALL_CATEGORIES)
    const categories: CategoryType[] = data?.categories

    const [setupGlobal, { loading: setupLoading }] = useMutation(SETUP_GLOBAL)

    const handleSetup = () => {
        setupGlobal({
            variables: {
                _id: globalData?._id,
            },
        }).then(res => {
            if (!res.errors) navigate("/")
        })
    }

    return (
        <PageSetup
            title="Create categories"
            active={3}
            isLoading={loading}
            error={error?.message}
        >
            <AddCategory isSetup />

            {categories?.length > 0 ? (
                <ListCards>
                    {categories.map(category => (
                        <CategoryLine
                            category={category}
                            isSetup
                            key={category?._id}
                        />
                    ))}
                </ListCards>
            ) : (
                <Text>No category yet.</Text>
            )}

            <Button isLoading={setupLoading} onClick={handleSetup}>
                Finish setup
            </Button>
        </PageSetup>
    )
}

export default SetupCategories
