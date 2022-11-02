/*=============================================== Page ===============================================*/

import React from "react"
import {
    Main,
    Aside,
    ComponentProps,
    Breadcrumbs,
    Text,
    Breakpoints
} from "tsx-library-julseb"
import styled from "styled-components/macro"

import DefaultLayout from "./DefaultLayout"
import Header from "./Header"
import ListAside from "./ListAside"
import ErrorPage from "./ErrorPage"
import StyledWrapper from "./Wrapper"

const StyledMain = styled(Main)<{ $mainOnly?: boolean }>`
    margin-top: 56px;

    @media ${Breakpoints.Tablet} {
        padding-bottom: 0;
        padding-top: 0;
        margin-top: 0;
        min-height: ${({ $mainOnly }) => $mainOnly && `calc(100vh - ${56 * 3}px)`}
    }
`

const StyledAside = styled(Aside)`
    margin-top: 56px;

    @media ${Breakpoints.Tablet} {
        padding-top: 0;
        margin-top: 0;
        padding-bottom: 0;
    }
`

const Page = ({
    title,
    description,
    keywords,
    cover,
    template = "1col",
    children,
    mainWidth = "default",
    aside,
    breadcrumbs,
    isLoading,
    author,
    error
}: Props) => {
    const baseBreadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Home",
            to: "/",
        },
    ]

    if(error) return <ErrorPage error={error} />

    return (
        <DefaultLayout
            title={title}
            description={description}
            keywords={keywords}
            cover={cover}
            isLoading={isLoading}
        >
            <Header />

            <StyledWrapper template={aside ? "2cols" : template}>
                {template !== "1col" && !aside ? (
                    children
                ) : aside ? (
                    <>
                        <StyledMain size={mainWidth} position={1}>
                            {breadcrumbs && (
                                <Breadcrumbs
                                    items={[...baseBreadcrumbs, ...breadcrumbs]}
                                    separator="icon"
                                />
                            )}

                            {!author && <Text tag="h1">{title}</Text>}

                            {children}
                        </StyledMain>

                        <StyledAside position={2}>
                            {aside.posts && <ListAside content="posts" />}

                            {aside.categories && (
                                <ListAside content="categories" />
                            )}

                            {aside.authors && <ListAside content="authors" />}
                        </StyledAside>
                    </>
                ) : (
                    <StyledMain size={mainWidth} $mainOnly>{children}</StyledMain>
                )}
            </StyledWrapper>
        </DefaultLayout>
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
    aside?: {
        posts?: boolean
        authors?: boolean
        categories?: boolean
    }
    breadcrumbs?: ComponentProps.BreadcrumbsItemProps[]
    isLoading?: boolean
    author?: boolean
    error?: string
}
