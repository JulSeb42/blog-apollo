/*=============================================== CategoryCard styles ===============================================*/

import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { Radiuses, Transitions, Shadows, ThemeLight, Spacers, Mixins, Breakpoints } from "tsx-library-julseb"

const StyledCategoryCard = styled(Link)`
    background-color: ${ThemeLight.Background};
    padding: ${Spacers.XS};
    border-radius: ${Radiuses.M};
    ${Mixins.Grid({
        $gap: "xxs",
    })};
    text-decoration: none;
    color: ${ThemeLight.Font};
    box-shadow: ${Shadows.XS};
    transition: ${Transitions.Short};

    @media ${Breakpoints.Hover} {
        &:hover {
            transform: scale(1.02);
            box-shadow: ${Shadows.S};
        }

        &:hover {
            transform: scale(1.01);
            box-shadow: ${Shadows.XS};
        }
    }
`

export { StyledCategoryCard }
