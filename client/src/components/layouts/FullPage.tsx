/*=============================================== FullPage ===============================================*/

import React, { useContext } from "react"
import { Cover, Text, Main, Aside, Breakpoints } from "tsx-library-julseb"
import styled from "styled-components/macro"

import { GlobalContext, GlobalContextType } from "../../context/global"

import DefaultLayout from "./DefaultLayout"
import Header from "./Header"
import FeaturedPosts from "../posts/FeaturedPosts"
import ListAside from "./ListAside"
import ErrorPage from "./ErrorPage"
import StyledWrapper from "./Wrapper"

const StyledMain = styled(Main)<{ $isHomepage?: boolean }>`
    padding-top: ${({ $isHomepage }) => $isHomepage && 0};

    @media ${Breakpoints.Tablet} {
        padding-bottom: 0;
        padding-top: 0;
        margin-top: 0;
    }
`

const StyledAside = styled(Aside)<{ $isHomepage?: boolean }>`
    padding-top: ${({ $isHomepage }) => $isHomepage && 0};

    @media ${Breakpoints.Tablet} {
        padding-bottom: 0;
        padding-top: 0;
        margin-top: 0;
    }
`

const FullPage = ({
    title,
    description,
    keywords,
    cover,
    children,
    isHomepage,
    isLoading,
    error,
}: Props) => {
    const { globalData } = useContext(GlobalContext) as GlobalContextType

    if (error) return <ErrorPage error={error} />

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

                {isHomepage && globalData?.baseline && (
                    <Text tag="h2">{globalData?.baseline}</Text>
                )}
            </Cover>

            {isHomepage && <FeaturedPosts />}

            <StyledWrapper template="2cols" $isFullPage>
                <StyledMain position={1} $isHomepage={isHomepage}>
                    {children}
                </StyledMain>

                <StyledAside position={2} $isHomepage={isHomepage}>
                    {!isHomepage && <ListAside content="posts" />}
                    <ListAside content="categories" />
                    <ListAside content="authors" />
                </StyledAside>
            </StyledWrapper>
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
    error?: string
}
