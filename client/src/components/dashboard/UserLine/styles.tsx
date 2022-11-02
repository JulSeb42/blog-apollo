/*=============================================== UserLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, Breakpoints } from "tsx-library-julseb"

const StyledUserLine = styled.div`
    ${Mixins.Grid({
        $gap: "xs",
    })};
`

const Content = styled.div`
    ${Mixins.Grid({
        $gap: "s",
        $col: 4,
        $alignContent: "start",
    })};

    @media ${Breakpoints.Mobile} {
        grid-template-columns: repeat(2, 1fr);
    }
`

const BadgeContainer = styled.span`
    height: 24px;
    ${Mixins.Flexbox({
        $alignItems: "center",
    })};
`

export { StyledUserLine, Content, BadgeContainer }
