/*=============================================== DefaultLayout ===============================================*/

import React from "react"
import { PageLoading } from "tsx-library-julseb"

import Helmet from "./Helmet"
import Footer from "./Footer"

const DefaultLayout = ({
    title,
    description,
    keywords,
    cover,
    children,
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
                    {children}

                    <Footer />
                </>
            )}
        </>
    )
}

export default DefaultLayout

interface Props {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
    children?: any
    isLoading?: boolean
}
