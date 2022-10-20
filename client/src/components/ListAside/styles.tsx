/*=============================================== ListAside styles ===============================================*/

import styled from "styled-components/macro"
import { TextIcon, Transitions, Mixins, Spacers } from "tsx-library-julseb"

const StyledListAside = styled.div`
    ${Mixins.Grid({
        $gap: "xxs",
    })};
`

const Text = styled(TextIcon)`
    transition: ${Transitions.Short};

    &:hover {
        transform: translateX(${Spacers.XXS});
    }
`

export { StyledListAside, Text }
