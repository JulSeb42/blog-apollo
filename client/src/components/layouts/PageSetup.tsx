/*=============================================== PageSetup ===============================================*/

import React from "react"
import { Text, Wrapper, Main, Button } from "tsx-library-julseb"

import Helmet from "./Helmet"
import Stepper from "../Stepper"

const PageSetup = ({ title, children, prev, next, active }: Props) => {
    return (
        <>
            <Helmet title={title} />

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
                            Skip this step
                        </Button>
                    )}
                </Main>
            </Wrapper>
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
}
