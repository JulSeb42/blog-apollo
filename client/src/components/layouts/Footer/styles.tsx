/*=============================================== Footer styles ===============================================*/

import styled from "styled-components/macro"
import { Mixins, ThemeLight, Spacers, Breakpoints } from "tsx-library-julseb"

const StyledFooter = styled.footer`
    width: 100%;
    ${Mixins.Flexbox({
        $alignItems: "center",
        $justifyContent: "space-between",
    })};
    padding: ${Spacers.M} 5%;
    background-color: ${ThemeLight.Primary500};
    color: ${ThemeLight.White};

    @media ${Breakpoints.Hover} {
        a {
            color: ${ThemeLight.ColorsHoverDefault({ $color: "white" })};
            text-decoration: none;

            &:hover {
                color: ${ThemeLight.ColorsHoverHover({ $color: "primary" })};
            }

            &:active {
                color: ${ThemeLight.ColorsHoverActive({ $color: "primary" })};
            }
        }
    }
`

export { StyledFooter }
