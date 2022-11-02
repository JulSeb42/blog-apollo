/*=============================================== NavigationLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, Breakpoints } from "tsx-library-julseb"

const StyledNavigationLine = styled.div`
    ${Mixins.Grid({
        $gap: "s",
        $col: 5,
    })};

    @media ${Breakpoints.Mobile} {
        grid-template-columns: repeat(2, 1fr);

        & > p {
            grid-column: span 2;
        }
    }
`

export { StyledNavigationLine }
