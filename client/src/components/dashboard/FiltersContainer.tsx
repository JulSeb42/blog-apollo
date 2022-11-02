/*=============================================== FiltersContainer ===============================================*/

import React from "react"
import styled from "styled-components/macro"
import { Flexbox, Button } from "tsx-library-julseb"
import { useMaxWidth } from "../../hooks"

const FiltersContainer = ({ children, reset }: Props) => {
    const isSmaller = useMaxWidth(768)

    return (
        <StyledFiltersContainer flexWrap={isSmaller ? "wrap" : "nowrap"}>
            {children}

            <Button variant="outline" onClick={reset}>
                Reset filters
            </Button>
        </StyledFiltersContainer>
    )
}

export default FiltersContainer

const StyledFiltersContainer = styled(Flexbox).attrs({
    gap: "s",
    alignItems: "flex-end",
})`
    & > div {
        flex-grow: 1;
    }

    & > button {
        height: 32px;
    }
`

interface Props {
    children?: any
    reset: () => void
}
