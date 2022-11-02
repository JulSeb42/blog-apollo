/*=============================================== NavDashboard styles ===============================================*/

import styled from "styled-components/macro"
import {
    ThemeLight,
    Spacers,
    Mixins,
    FontWeights,
    Breakpoints,
    Burger,
    Transitions,
} from "tsx-library-julseb"

const StyledNavDashboard = styled.nav<{ $isOpen: boolean }>`
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

    @media ${Breakpoints.Tablet} {
        transition: ${Transitions.Short};
        z-index: 997;
        width: ${({ $isOpen }) => ($isOpen ? "250px" : 0)};
        padding: ${({ $isOpen }) => ($isOpen ? Spacers.L : 0)};
        overflow: hidden;
    }
`

const StyledBurger = styled(Burger)<{ isOpen: boolean }>`
    z-index: 999;
    position: fixed;
    top: ${Spacers.XXL};
    right: ${Spacers.XXL};
`

export { StyledNavDashboard, StyledBurger }
