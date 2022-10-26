/*=============================================== CommentLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, ThemeLight, Spacers } from "tsx-library-julseb"

const StyledCommentLine = styled.div`
    ${Mixins.Grid({
        $col: 1,
        $gap: "s",
    })};

    &:not(:last-child) {
        border-bottom: 1px solid ${ThemeLight.Gray200};
        padding-bottom: ${Spacers.S};
    }
`

export { StyledCommentLine }
