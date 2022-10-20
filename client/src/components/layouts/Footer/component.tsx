/*=============================================== Footer component ===============================================*/

import React from "react"
import { Text, Flexbox } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { uuid } from "../../../utils"

import * as Styles from "./styles"
import { FooterLinkType } from "./types"

import siteData from "../../../data/site-data"

const Footer = () => {
    const footerLinks: FooterLinkType[] = [
        {
            text: "About",
            to: "#",
        },
        {
            text: "Contact",
            to: "#",
        },
        {
            text: "Privacy policy",
            to: "#",
        },
        {
            text: "Impressum",
            to: "#",
        },
    ]

    return (
        <Styles.StyledFooter>
            <Flexbox alignItems="center" gap="xs">
                {footerLinks.map(({ text, to }) => (
                    <Link to={to} key={uuid()}>
                        {text}
                    </Link>
                ))}
            </Flexbox>

            <Text>
                &copy; {siteData.author} | {siteData.year}
            </Text>
        </Styles.StyledFooter>
    )
}

export default Footer
