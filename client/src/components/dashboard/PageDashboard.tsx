/*=============================================== PageDashboard ===============================================*/

import React from "react"
import styled from "styled-components/macro"
import { Wrapper, Main, PageLoading, Button } from "tsx-library-julseb"
import { useLocation } from "react-router-dom"

import Helmet from "../layouts/Helmet"
import NavDashboard from "./NavDashboard"

const PageDashboard = ({ title, children, isLoading }: Props) => {
    const location = useLocation().pathname

    return (
        <>
            <Helmet title={title} />

            {isLoading ? (
                <PageLoading loaderVariant={4} />
            ) : (
                <>
                    <NavDashboard />

                    <StyledWrapper>
                        <Main size="large">
                            {location !== "/dashboard" && (
                                <Button
                                    variant="text"
                                    icons={{ left: "chevron-left" }}
                                    // @ts-expect-error
                                    to={-1}
                                    noPadding
                                >
                                    Back
                                </Button>
                            )}

                            {children}
                        </Main>
                    </StyledWrapper>
                </>
            )}
        </>
    )
}

export default PageDashboard

interface Props {
    title: string
    children?: any
    isLoading?: boolean
}

const StyledWrapper = styled(Wrapper)`
    width: calc(100% - 250px);
    left: 250px;
    position: relative;
`
