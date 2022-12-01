/*=============================================== Header ===============================================*/

import React, { useContext } from "react"
import {
    Header as Container,
    ThemeLight,
    Breakpoints,
} from "tsx-library-julseb"
import { NavLink } from "react-router-dom"
import { uuid } from "../../utils"
import styled from "styled-components/macro"
import { useQuery } from "@apollo/client"

import { AuthContext, AuthContextType } from "../../context/auth"
import { GlobalContext, GlobalContextType } from "../../context/global"

import Search from "./Search"

import { NavItemType } from "../../types"
import { PageType, ContactPagesType } from "../../types"
import { HEADER_PAGES, GET_CONTACT_PAGE } from "../../graphql/queries"

const Header = ({ isTransparent }: Props) => {
    const { isLoggedIn } = useContext(AuthContext) as AuthContextType
    const { globalData } = useContext(GlobalContext) as GlobalContextType

    const { data } = useQuery(HEADER_PAGES)
    const headerPages: PageType[] = data?.pages

    const { data: contactData } = useQuery(GET_CONTACT_PAGE)
    const contactPage: ContactPagesType = contactData?.contactPage

    const pagesArr: NavItemType[] = headerPages?.map(page => ({
        text: page.title,
        to: page.slug,
        order: page.orderHeader,
    }))

    if (contactPage?.header && !contactPage?.hideContact) {
        pagesArr?.push({
            text: contactPage?.title,
            to: "contact",
            order: contactPage?.orderHeader,
        })
    }

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
            logo={{ text: globalData?.name || "" }}
            hideOnScroll={400}
            position="fixed"
            backgroundColor={isTransparent ? "transparent" : "primary"}
            navMobileVariant="drawer"
        >
            {navLinks(baseLinks)}

            {pagesArr
                // @ts-expect-error
                ?.sort((a, b) => (a.order < b.order ? -1 : 0))
                .map(page => (
                    <NavLink to={`/${page.to}`} key={uuid()}>
                        {page.text}
                    </NavLink>
                ))}

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
