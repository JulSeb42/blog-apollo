/*=============================================== Stepper styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, ThemeLight } from "tsx-library-julseb"

const StyledStepper = styled.div`
    ${Mixins.Flexbox({
        $alignItems: "center",
        $gap: "xs",
    })};
`

const Line = styled.span`
    background-color: ${ThemeLight.Primary500};
    height: 1px;
    flex-grow: 1;
`

const StyledItem = styled.div<{ $isActive?: boolean }>`
    ${Mixins.Flexbox({
        $alignItems: "center",
        $gap: "xs",
    })};
`

export { StyledStepper, Line, StyledItem }
