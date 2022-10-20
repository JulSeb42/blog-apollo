/*=============================================== Page ===============================================*/

import React from "react"
import { Wrapper, Main } from "tsx-library-julseb"

import Helmet from "./Helmet"
import Header from "./Header"
import Footer from "./Footer"

const Page = ({
    title,
    description,
    keywords,
    cover,
    template = "1col",
    children,
    mainWidth = "default",
}: Props) => {
    return (
        <>
            <Helmet
                title={title}
                description={description}
                keywords={keywords}
                cover={cover}
            />

            <Header />

            <Wrapper template={template}>
                {template !== "1col" ? (
                    children
                ) : (
                    <Main size={mainWidth}>{children}</Main>
                )}
            </Wrapper>

            <Footer />
        </>
    )
}

export default Page

interface Props {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
    template?: "1col" | "2cols" | "3cols"
    children?: any
    mainWidth?: "default" | "large" | "form" | number
}
