/*=============================================== HeaderListUsers ===============================================*/

import styled from "styled-components/macro"
import { ThemeLight, Mixins, Spacers, Breakpoints } from "tsx-library-julseb"

const HeaderListUsers = styled.div<{ $isNavigation?: boolean }>`
    border-bottom: none !important;
    background-color: ${ThemeLight.Gray50};
    padding: ${Spacers.S} ${Spacers.XS};
    ${({ $isNavigation }) =>
        Mixins.Grid({
            $gap: "s",
            $col: $isNavigation ? 5 : 4,
        })};

    @media ${Breakpoints.Mobile} {
        grid-template-columns: repeat(2, 1fr);

        & > h6:first-child {
            grid-column: span 2;
        }
    }
`

export default HeaderListUsers
