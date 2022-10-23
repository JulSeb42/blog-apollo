/*=============================================== CardComment styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, ThemeLight, Spacers } from "tsx-library-julseb"

const StyledCardComment = styled.div`
    ${Mixins.Grid({
        $gap: "xs",
    })};

    &:not(:last-child) {
        border-bottom: 1px solid ${ThemeLight.Gray200};
        padding-bottom: ${Spacers.XS};
    }
`

export { StyledCardComment }
