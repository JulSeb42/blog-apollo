/*=============================================== NavigationLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins } from "tsx-library-julseb"

const StyledNavigationLine = styled.div`
    ${Mixins.Grid({
        $gap: "s",
        $col: 5,
    })}
`

export { StyledNavigationLine }
