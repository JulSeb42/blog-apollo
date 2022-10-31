/*=============================================== UserLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins } from "tsx-library-julseb"

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
`

const BadgeContainer = styled.span`
    height: 24px;
    ${Mixins.Flexbox({
        $alignItems: "center",
    })};
`

export { StyledUserLine, Content, BadgeContainer }
