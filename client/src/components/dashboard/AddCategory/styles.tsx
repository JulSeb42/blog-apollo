/*=============================================== AddCategory styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins } from "tsx-library-julseb"

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
`

export { StyledAddCategory }
