/*=============================================== NavDashboard component ===============================================*/

import React, { useContext } from "react"
import { Grid, Text, TextIcon } from "tsx-library-julseb"
import { NavLink } from "react-router-dom"
import { uuid } from "../../../utils"

import { AuthContext, AuthContextType } from "../../../context/auth"

import * as Styles from "./styles"

import siteData from "../../../data/site-data"
import { NavItemType } from "../../../types"

const NavDashboard = () => {
    const { user, logoutUser } = useContext(AuthContext) as AuthContextType

    const navItems: NavItem[] = [
        {
            text: "Dashboard",
            to: "/dashboard",
            icon: "dashboard",
            end: true,
        },
        {
            text: "Categories",
            to: "/dashboard/categories",
            icon: "categories",
        },
        {
            text: "Edit your profile",
            to: "/dashboard/edit-profile",
            icon: "edit",
        },
    ]

    const modeItems: NavItem[] = [
        {
            text: "Comments",
            to: "/dashboard/comments",
            icon: "bubble",
        },
    ]

    const adminItems: NavItem[] = [
        {
            text: "Pages",
            to: "/dashboard/pages",
            icon: "file",
        },
        {
            text: "Global dala",
            to: "/dashboard/global-data",
            icon: "database",
        },
        {
            text: "Users",
            to: "/dashboard/users",
            icon: "user",
        },
        {
            text: "Navigation items",
            to: "/dashboard/navigation",
            icon: "sitemap",
        },
    ]

    const bottomItems: NavItem[] = [
        {
            text: "Go to website",
            to: "/",
            icon: "link-external",
            blank: true,
        },
        {
            text: "Log out",
            onClick: logoutUser,
            icon: "logout",
        },
    ]

    const navLinks = (links: NavItem[]) =>
        links.map(link => (
            <TextIcon icon={link.icon} iconColor="white" linkColor="white" key={uuid()}>
                {link.to ? (
                    <NavLink
                        to={link.to}
                        target={link.blank ? "_blank" : ""}
                        rel={link.blank ? "noreferrer noopener" : ""}
                        end={link.end}
                    >
                        {link.text}
                    </NavLink>
                ) : (
                    <button onClick={link.onClick}>{link.text}</button>
                )}
            </TextIcon>
        ))

    return (
        <Styles.StyledNavDashboard>
            <Grid gap="xxs">
                <Text tag="h4" linkColor="white">
                    <NavLink to="/" end>
                        {siteData.name}
                    </NavLink>
                </Text>

                {navLinks(navItems)}

                {user?.role !== "writer" && navLinks(modeItems)}

                {user?.role === "admin" && navLinks(adminItems)}
            </Grid>

            <Grid gap="xxs">{navLinks(bottomItems)}</Grid>
        </Styles.StyledNavDashboard>
    )
}

export default NavDashboard

type NavItem = NavItemType & {
    icon: string
    blank?: boolean
}
