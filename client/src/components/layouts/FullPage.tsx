/*=============================================== FullPage ===============================================*/

import React, { useContext } from "react"
import { Cover, Text, Wrapper, Main, Aside } from "tsx-library-julseb"
import styled from "styled-components/macro"

import { GlobalContext, GlobalContextType } from "../../context/global"

import DefaultLayout from "./DefaultLayout"
import Header from "./Header"
import FeaturedPosts from "../posts/FeaturedPosts"
import ListAside from "./ListAside"

const FullPage = ({
    title,
    description,
    keywords,
    cover,
    children,
    isHomepage,
    isLoading,
}: Props) => {
    const { globalData } = useContext(GlobalContext) as GlobalContextType
    
    return (
        <DefaultLayout
            title={title}
            description={description}
            keywords={keywords}
            cover={cover}
            isLoading={isLoading}
        >
            <Header isTransparent />

            <Cover
                src={cover}
                alt={`Cover ${title}`}
                align="bottom"
                overlay="gradient-black"
                height="70vh"
            >
                <Text tag="h1">{isHomepage ? globalData?.name : title}</Text>

                {isHomepage && globalData?.baseline && <Text tag="h2">{globalData?.baseline}</Text>}
            </Cover>

            {isHomepage && <FeaturedPosts />}

            <Wrapper template="2cols">
                <StyledMain position={1} $isHomepage={isHomepage}>
                    {children}
                </StyledMain>

                <StyledAside position={2} $isHomepage={isHomepage}>
                    {!isHomepage && <ListAside content="posts" />}
                    <ListAside content="categories" />
                    <ListAside content="authors" />
                </StyledAside>
            </Wrapper>
        </DefaultLayout>
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

const StyledMain = styled(Main)<{ $isHomepage?: boolean }>`
    padding-top: ${({ $isHomepage }) => $isHomepage && 0};
`

const StyledAside = styled(Aside)<{ $isHomepage?: boolean }>`
    padding-top: ${({ $isHomepage }) => $isHomepage && 0};
`
