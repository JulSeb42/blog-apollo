/*=============================================== CardAuthor styles ===============================================*/

import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import {
    Mixins,
    ThemeLight,
    Transitions,
    Breakpoints,
} from "tsx-library-julseb"

const StyledCardAuthorSmall = styled(Link)`
    text-decoration: none;
    ${Mixins.Grid({
        $gap: "xxs",
    })};
    color: ${ThemeLight.Font};

    & > span {
        width: 100%;
        aspect-ratio: 1;
        height: inherit;

        img {
            transition: ${Transitions.Short};
        }
    }

    @media ${Breakpoints.Hover} {
        &:hover > span img {
            scale: 1.02;
        }
    }
`

export { StyledCardAuthorSmall }
