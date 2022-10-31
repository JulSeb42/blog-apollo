/*=============================================== HeaderListUsers ===============================================*/

import styled from "styled-components/macro"
import { ThemeLight, Mixins, Spacers } from "tsx-library-julseb"

const HeaderListUsers = styled.div`
    border-bottom: none !important;
    background-color: ${ThemeLight.Gray50};
    padding: ${Spacers.S} ${Spacers.XS};
    ${Mixins.Grid({
        $gap: "s",
        $col: 4,
    })};
`

export default HeaderListUsers
