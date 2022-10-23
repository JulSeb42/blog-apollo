/*=============================================== CardAuthor styles ===============================================*/

import styled from "styled-components/macro"
import { ThemeLight, Radiuses, Mixins } from "tsx-library-julseb"

const StyledCardAuthor = styled.div`
    ${Mixins.Grid({
        $gap: "xxs",
        $padding: "s",
    })};
    border: 1px solid ${ThemeLight.Gray200};
    border-radius: ${Radiuses.M};
`

export { StyledCardAuthor }
