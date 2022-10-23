/*=============================================== Header ===============================================*/

import React, { useContext } from "react"
import { Header as Container, ThemeLight, Breakpoints } from "tsx-library-julseb"
import { NavLink } from "react-router-dom"
import { uuid } from "../../utils"
import styled from "styled-components/macro"

import { AuthContext, AuthContextType } from "../../context/auth"

import Search from "./Search"

import siteData from "../../data/site-data"

import { NavItemType } from "../../types"

const Header = ({ isTransparent }: Props) => {
    const { isLoggedIn } = useContext(AuthContext) as AuthContextType

    const baseLinks: NavItemType[] = [
        {
            text: "Home",
            to: "/",
            end: true,
        },
        {
            text: "Posts",
            to: "/posts",
        },
        {
            text: "About",
            to: "/about",
        },
        {
            text: "Contact",
            to: "/contact",
        },
    ]

    const protectedLinks: NavItemType[] = [
        {
            text: "Dashboard",
            to: "/dashboard",
        },
    ]

    const navLinks = (links: NavItemType[]) =>
        links.map(({ text, to, onClick, end }) =>
            to ? (
                <NavLink to={to} end={end} key={uuid()}>
                    {text}
                </NavLink>
            ) : (
                <button onClick={onClick} key={uuid()}>
                    {text}
                </button>
            )
        )

    return (
        <StyledHeader
            logo={{ text: siteData.name }}
            hideOnScroll={400}
            position="fixed"
            backgroundColor={isTransparent ? "transparent" : "primary"}
        >
            {navLinks(baseLinks)}

            {isLoggedIn && navLinks(protectedLinks)}

            <Search />
        </StyledHeader>
    )
}

export default Header

interface Props {
    isTransparent?: boolean
}

const StyledHeader = styled(Container)`
    @media ${Breakpoints.Hover} {
        nav > a,
        nav > button {
            &:hover {
                color: ${ThemeLight.ColorsHoverHover({ $color: "primary" })};
            }

            &:active {
                color: ${ThemeLight.ColorsHoverActive({ $color: "primary" })};
            }
        }
    }
`
