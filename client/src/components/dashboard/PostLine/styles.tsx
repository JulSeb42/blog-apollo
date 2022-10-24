/*=============================================== PostLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, Spacers, ThemeLight } from "tsx-library-julseb"

const StyledPostLine = styled.div<{ $noBorder?: boolean }>`
    ${Mixins.Flexbox({
        $alignItems: "flex-start",
        $justifyContent: "flex-start",
        $gap: "xs",
    })};
    padding-bottom: ${Spacers.S};
    border-bottom: ${({ $noBorder }) =>
        !$noBorder && `1px solid ${ThemeLight.Gray200}`};

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
