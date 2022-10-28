/*=============================================== GlobalContext ===============================================*/

import React, { createContext, useState, useEffect } from "react"
import { useQuery } from "@apollo/client"

import { GLOBAL_DATA } from "../graphql/queries"
import { GlobalType } from "../types"

export type GlobalContextType = {
    globalData: GlobalType | undefined
    loading?: boolean
}

const GlobalContext = createContext<GlobalType | GlobalContextType | null>(null)

const GlobalProviderWrapper = ({ children }: Props) => {
    const { data, loading } = useQuery(GLOBAL_DATA)

    const [globalData, setGlobalData] = useState<undefined | GlobalType>(
        undefined
    )

    useEffect(() => {
        setGlobalData(data?.globalData)
    }, [data?.globalData])

    return (
        <GlobalContext.Provider
            value={{
                globalData,
                loading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProviderWrapper }

interface Props {
    children?: any
}
