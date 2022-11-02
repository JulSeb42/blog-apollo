/*=============================================== AddCategory styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, Breakpoints } from "tsx-library-julseb"

const StyledAddCategory = styled.form<{ $hasError: boolean }>`
    ${({ $hasError }) =>
        Mixins.Flexbox({
            $gap: "xs",
            $alignItems: $hasError ? "center" : "flex-end",
        })};

    & > button {
        height: 32px;
        transform: ${({ $hasError }) => $hasError && "translateY(1px)"};
    }

    & > div {
        flex-grow: 1;
    }

    @media ${Breakpoints.Tablet} {
        flex-wrap: wrap;
    }
`

export { StyledAddCategory }
