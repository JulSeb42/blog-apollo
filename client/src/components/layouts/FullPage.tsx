/*=============================================== FullPage ===============================================*/

import React from "react"
import { Cover, Text, PageLoading } from "tsx-library-julseb"

import Helmet from "./Helmet"
import Header from "./Header"
import Footer from "./Footer"

import siteData from "../../data/site-data"

const FullPage = ({
    title,
    description,
    keywords,
    cover,
    children,
    isHomepage,
    isLoading,
}: Props) => {
    return (
        <>
            <Helmet
                title={title}
                description={description}
                keywords={keywords}
                cover={cover}
            />

            {isLoading ? (
                <PageLoading loaderVariant={4} />
            ) : (
                <>
                    <Header isTransparent />

                    <Cover
                        src={cover}
                        alt={`Cover ${title}`}
                        align="bottom"
                        overlay="gradient-black"
                        height="70vh"
                    >
                        <Text tag="h1">
                            {isHomepage ? siteData.name : title}
                        </Text>

                        {isHomepage && (
                            <Text tag="h2">{siteData.baseline}</Text>
                        )}
                    </Cover>

                    {children}

                    <Footer />
                </>
            )}
        </>
    )
}

export default FullPage

interface Props {
    title: string
    description?: string
    keywords?: string | string[]
    cover: string
    children?: any
    isHomepage?: boolean
    isLoading?: boolean
}
