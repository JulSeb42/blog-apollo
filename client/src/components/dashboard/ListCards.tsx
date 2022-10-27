/*=============================================== ListCards ===============================================*/

import styled from "styled-components/macro"
import { ThemeLight, Mixins, Spacers } from "tsx-library-julseb"

const ListCards = styled.div`
    ${Mixins.Grid({
        $gap: "s",
    })};

    & > div:not(:last-child) {
        border-bottom: 1px solid ${ThemeLight.Gray200};
        padding-bottom: ${Spacers.S};
    }
`

export default ListCards
