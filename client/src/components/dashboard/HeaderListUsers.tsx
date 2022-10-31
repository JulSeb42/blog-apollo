/*=============================================== HeaderListUsers ===============================================*/

import styled from "styled-components/macro"
import { ThemeLight, Mixins, Spacers } from "tsx-library-julseb"

const HeaderListUsers = styled.div<{ $isNavigation?: boolean }>`
    border-bottom: none !important;
    background-color: ${ThemeLight.Gray50};
    padding: ${Spacers.S} ${Spacers.XS};
    ${({ $isNavigation }) =>
        Mixins.Grid({
            $gap: "s",
            $col: $isNavigation ? 5 : 4,
        })};
`

export default HeaderListUsers
