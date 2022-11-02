/*=============================================== Wrapper ===============================================*/

import styled from "styled-components/macro"
import { Wrapper, Breakpoints, Spacers } from "tsx-library-julseb"

const StyledWrapper = styled(Wrapper)<{ $isFullPage?: boolean }>`
    @media ${Breakpoints.Tablet} {
        margin-top: ${({ $isFullPage }) => (!$isFullPage ? "56px" : "-1px")};
        padding: ${Spacers.XXL} 0;
    }
`

export default StyledWrapper
