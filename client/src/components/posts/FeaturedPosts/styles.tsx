/*=============================================== FeaturedPosts styles ===============================================*/

import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { Spacers, Mixins, ThemeLight, Radiuses, Text, Overlays, Transitions } from "tsx-library-julseb"

const StyledFeaturedPosts = styled.div`
    padding: ${Spacers.XXL} 5%;
    ${Mixins.Grid({
        $gap: "l",
    })};
    background-color: ${ThemeLight.Background};
    position: relative;
    z-index: 10;
`

const Card = styled(Link)`
    width: 100%;
    height: 15vw;
    color: ${ThemeLight.Background};
    text-decoration: none;
    max-height: 250px;
    border-radius: ${Radiuses.L};
    overflow: hidden;
    position: relative;

    &:before {
        content: "";
        background: ${Overlays.Gradient.Black};
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    img {
        position: relative;
        z-index: 0;
        transition: ${Transitions.Short};
    }

    &:hover img {
        transform: scale(1.05)
    }
`

const Content = styled(Text)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    padding: ${Spacers.S};
    ${Mixins.Flexbox({
        $alignItems: "flex-end",
    })}
`

export { StyledFeaturedPosts, Card, Content }
