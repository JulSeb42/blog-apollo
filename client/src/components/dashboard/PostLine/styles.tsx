/*=============================================== PostLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins } from "tsx-library-julseb"

const StyledPostLine = styled.div<{ $noBorder?: boolean }>`
    ${Mixins.Flexbox({
        $alignItems: "flex-start",
        $justifyContent: "flex-start",
        $gap: "xs",
    })};

    & > span {
        margin-top: 10px;
    }

    & > div:first-of-type {
        flex-grow: 1;
    }

    & > div:last-child {
        margin-top: 2px;
    }
`

export { StyledPostLine }
