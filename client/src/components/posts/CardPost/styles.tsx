/*=============================================== CardPost styles ===============================================*/

import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { Mixins, Text, ThemeLight, Transitions, Radiuses } from "tsx-library-julseb"

const ImgContainer = styled.span`
    overflow: hidden;
    border-radius: ${Radiuses.M};

    img {
        transition: ${Transitions.Short};
    }
`

const StyledCardPost = styled(Link)`
    ${Mixins.Grid({
        $gap: "xxs",
    })};
    color: ${ThemeLight.Font};
    text-decoration: none;
    
    &:hover img {
        transform: scale(1.02);
    }
`

const Title = styled(Text)`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

const Body = styled(Text)`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

export { StyledCardPost, Title, Body, ImgContainer }
