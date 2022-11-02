/*=============================================== NavDashboard component ===============================================*/

import React, { useContext } from "react"
import { Grid, Text, TextIcon } from "tsx-library-julseb"
import { NavLink } from "react-router-dom"
import { uuid } from "../../../utils"

import { AuthContext, AuthContextType } from "../../../context/auth"
import { GlobalContext, GlobalContextType } from "../../../context/global"

import * as Styles from "./styles"

import { NavItemType } from "../../../types"

const NavDashboard = ({ isOpen, setIsOpen }: Props) => {
    const { user, logoutUser } = useContext(AuthContext) as AuthContextType
    const { globalData } = useContext(GlobalContext) as GlobalContextType

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
            text: "Global data",
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
            end: true,
        },
        {
            text: "Log out",
            onClick: logoutUser,
            icon: "logout",
            end: true,
        },
    ]

    const navLinks = (links: NavItem[]) =>
        links.map(link => (
            <TextIcon
                icon={link.icon}
                iconColor="white"
                linkColor="white"
                key={uuid()}
            >
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
        <>
            <Styles.StyledNavDashboard $isOpen={isOpen}>
                <Grid gap="xxs">
                    <Text tag="h4" linkColor="white">
                        <NavLink
                            to="/"
                            target="_blank"
                            rel="noreferrer noopener"
                            end
                        >
                            {globalData?.name}
                        </NavLink>
                    </Text>

                    {navLinks(navItems)}

                    {user?.role !== "writer" && navLinks(modeItems)}

                    {user?.role === "admin" && navLinks(adminItems)}
                </Grid>

                <Grid gap="xxs">{navLinks(bottomItems)}</Grid>
            </Styles.StyledNavDashboard>

            <Styles.StyledBurger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </>
    )
}

export default NavDashboard

type NavItem = NavItemType & {
    icon: string
    blank?: boolean
}

interface Props {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}