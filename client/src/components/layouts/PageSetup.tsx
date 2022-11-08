/*=============================================== PageSetup ===============================================*/

import React from "react"
import { Text, Wrapper, Main, Button, PageLoading } from "tsx-library-julseb"

import Helmet from "./Helmet"
import Stepper from "../Stepper"
import ErrorPage from "./ErrorPage"

const PageSetup = ({
    title,
    children,
    prev,
    next,
    active,
    isLoading,
    error,
}: Props) => {
    if (error) return <ErrorPage error={error} />

    return (
        <>
            <Helmet title={title} />

            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    <Wrapper>
                        <Main size="form">
                            {active && <Stepper active={active} />}
                            <Text tag="h1">{title}</Text>

                            {children}

                            {next && (
                                <Button
                                    to={next}
                                    icons={{ right: "chevron-right" }}
                                    variant="text"
                                    noPadding
                                >
                                    Next step
                                </Button>
                            )}
                        </Main>
                    </Wrapper>
                </>
            )}
        </>
    )
}

export default PageSetup

interface Props {
    title: string
    children?: any
    prev?: string
    next?: string
    active?: 1 | 2 | 3
    isLoading?: boolean
    error?: string
}
