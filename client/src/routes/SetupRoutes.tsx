/*=============================================== SetupRoutes ===============================================*/

import React, { useContext, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { GlobalContext, GlobalContextType } from "../context/global"

const SetupRoutes = ({ children }: Props) => {
    const { globalData, loading } = useContext(
        GlobalContext
    ) as GlobalContextType
    const location = useLocation().pathname

    const [isLoading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, 200)

    return loading || isLoading ? (
        <PageLoading />
    ) : globalData?.isGlobalSetup === true || location.includes("/setup") || location.includes("/graphql") ? (
        children
    ) : (
        <Navigate to="/setup/new-account" />
    )
}

export default SetupRoutes

interface Props {
    children?: any
}
