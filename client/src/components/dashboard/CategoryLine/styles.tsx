/*=============================================== CategoryLine styles ===============================================*/

import styled from "styled-components/macro"
import { ThemeLight, Spacers, Mixins } from "tsx-library-julseb"

const StyledCategoryLine = styled.div`
    ${Mixins.Grid({
        $col: 1,
        $gap: "s",
    })};
    
    &:not(:last-child) {
        border-bottom: 1px solid ${ThemeLight.Gray200};
        padding-bottom: ${Spacers.S};
    }
`

const Line = styled.div`
    ${Mixins.Flexbox({
        $alignItems: "center",
        $justifyContent: "space-between",
        $gap: "xs",
    })};

    & > div {
        margin-top: 2px;
    }
`

const Form = styled.form`
    ${Mixins.Flexbox({
        $gap: "xs",
    })};

    & > input {
        max-width: 400px;
    }
`

export { StyledCategoryLine, Form, Line }
