/*=============================================== CategoryLine styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins } from "tsx-library-julseb"

const StyledCategoryLine = styled.div`
    ${Mixins.Grid({
        $col: 1,
        $gap: "s",
    })};
`

const Content = styled.div`
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
        $flexWrap: "wrap",
    })};

    & > input {
        max-width: 400px;
    }
`

export { StyledCategoryLine, Form, Content }
