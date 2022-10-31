/*=============================================== PageDashboard ===============================================*/

import React, { useContext } from "react"
import styled from "styled-components/macro"
import { Wrapper, Main, PageLoading, Button } from "tsx-library-julseb"
import { Navigate } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import Helmet from "../layouts/Helmet"
import NavDashboard from "./NavDashboard"

const PageDashboard = ({ title, children, isLoading, back }: Props) => {
    const { user } = useContext(AuthContext) as AuthContextType

    console.log(user)

    if(user?.password === user?.generatedPassword) return <Navigate to="/dashboard/change-password" />
    
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
                            {back && (
                                <Button
                                    variant="text"
                                    icons={{ left: "chevron-left" }}
                                    to={back}
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
    back?: string
}

const StyledWrapper = styled(Wrapper)`
    width: calc(100% - 250px);
    left: 250px;
    position: relative;
`
