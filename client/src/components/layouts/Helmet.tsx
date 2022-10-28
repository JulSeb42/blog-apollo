/*=============================================== Helmet ===============================================*/

import React, { useContext } from "react"
import { Helmet as Container } from "tsx-library-julseb"

import { GlobalContext, GlobalContextType } from "../../context/global"

import siteData from "../../data/site-data"

const Helmet = ({ title, description, keywords, cover }: Props) => {
    const { globalData } = useContext(GlobalContext) as GlobalContextType

    const globalKeywords =
        typeof globalData?.keywords === "string"
            ? globalData?.keywords
            : globalData?.keywords?.toString()

    return (
        <Container
            title={`${title} | ${globalData?.name}`}
            description={description}
            keywords={[globalKeywords, keywords]}
            favicon={globalData?.favicon}
            author={siteData.author}
            type={siteData.type}
            cover={cover || globalData?.cover}
            siteName={globalData?.name}
            language={globalData?.language}
        />
    )
}

export default Helmet

interface Props {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
}
