/*=============================================== PageLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins } from "tsx-library-julseb"

const StyledPageLine = styled.div`
    ${Mixins.Flexbox({
        $gap: "xs",
        $alignItems: "flex-start"
    })};

    h6 {
        flex-grow: 1;
    }
`

const BadgeContainer = styled.span`
    height: 26px;
    ${Mixins.Flexbox({
        $alignItems: "center",
    })};
`

export { StyledPageLine, BadgeContainer }
