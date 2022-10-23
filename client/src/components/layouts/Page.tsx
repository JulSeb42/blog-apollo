/*=============================================== Page ===============================================*/

import React from "react"
import {
    Wrapper,
    Main,
    Aside,
    ComponentProps,
    Breadcrumbs,
    Text
} from "tsx-library-julseb"
import styled from "styled-components/macro"

import DefaultLayout from "./DefaultLayout"
import Header from "./Header"
import ListAside from "./ListAside"

const StyledMain = styled(Main)`
    margin-top: 56px;
`

const StyledAside = styled(Aside)`
    margin-top: 56px;
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
}: Props) => {
    const baseBreadcrumbs: ComponentProps.BreadcrumbsItemProps[] = [
        {
            text: "Home",
            to: "/",
        },
    ]

    return (
        <DefaultLayout
            title={title}
            description={description}
            keywords={keywords}
            cover={cover}
            isLoading={isLoading}
        >
            <Header />

            <Wrapper template={aside ? "2cols" : template}>
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
                    <StyledMain size={mainWidth}>{children}</StyledMain>
                )}
            </Wrapper>
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
}
