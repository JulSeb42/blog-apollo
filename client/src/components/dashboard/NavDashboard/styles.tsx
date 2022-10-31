/*=============================================== NavDashboard styles ===============================================*/

import styled from "styled-components/macro"
import {
    ThemeLight,
    Spacers,
    Mixins,
    FontWeights,
    Breakpoints,
} from "tsx-library-julseb"

const StyledNavDashboard = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background-color: ${ThemeLight.Primary500};
    padding: ${Spacers.L};
    ${Mixins.Flexbox({
        $flexDirection: "column",
        $alignItems: "flex-start",
        $justifyContent: "space-between",
    })};

    h4 {
        margin-bottom: ${Spacers.S};
    }

    p a {
        font-weight: ${FontWeights.Regular};

        &.active {
            font-weight: ${FontWeights.Black};
            color: ${ThemeLight.Secondary500};

            @media ${Breakpoints.Hover} {
                &:hover {
                    color: ${ThemeLight.Primary300};
                }

                &:active {
                    color: ${ThemeLight.Primary600};
                }
            }
        }
    }

    button {
        font-weight: ${FontWeights.Regular};
    }
`

export { StyledNavDashboard }
