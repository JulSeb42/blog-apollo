/*=============================================== PageDashboard ===============================================*/

import React, { useContext, useState } from "react"
import styled from "styled-components/macro"
import {
    Wrapper,
    Main,
    PageLoading,
    Button,
    Breakpoints,
    Transitions
} from "tsx-library-julseb"
import { Navigate } from "react-router-dom"

import { AuthContext, AuthContextType } from "../../context/auth"

import Helmet from "../layouts/Helmet"
import NavDashboard from "./NavDashboard"
import ErrorPage from "../layouts/ErrorPage"

const PageDashboard = ({
    title,
    children,
    isLoading,
    back,
    role,
    error,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const { user } = useContext(AuthContext) as AuthContextType

    if (error) return <ErrorPage error={error} />

    if (user?.password === user?.generatedPassword)
        return <Navigate to="/dashboard/change-password" />

    if (user?.role === "writer" && role === "moderator")
        return <Navigate to="/dashboard" />

    if (user?.role === "moderator" && role === "admin")
        return <Navigate to="/dashboard" />

    if (!user?.approved) return <Navigate to="/dashboard/get-approval" />

    return (
        <>
            <Helmet title={title} />

            {isLoading ? (
                <PageLoading loaderVariant={4} />
            ) : (
                <>
                    <NavDashboard isOpen={isOpen} setIsOpen={setIsOpen} />

                    <StyledWrapper $isOpen={isOpen}>
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
    role?: "admin" | "moderator" | "writer"
    error?: string
}

const StyledWrapper = styled(Wrapper)<{ $isOpen?: boolean }>`
    width: calc(100% - 250px);
    left: 250px;
    position: relative;

    @media ${Breakpoints.Tablet} {
        width: ${({ $isOpen }) => ($isOpen ? `calc(100% - 250px)` : "100%")};
        left: ${({ $isOpen }) => ($isOpen ? "250px" : 0)};
        transition: ${Transitions.Short};
    }
`
