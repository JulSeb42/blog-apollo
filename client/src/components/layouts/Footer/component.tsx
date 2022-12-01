/*=============================================== Footer component ===============================================*/

import React from "react"
import { Text, Flexbox } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { uuid } from "../../../utils"

import * as Styles from "./styles"
import { FooterLinkType } from "./types"

import siteData from "../../../data/site-data"
import { FOOTER_PAGES, GET_CONTACT_PAGE } from "../../../graphql/queries"
import { PageType, ContactPagesType } from "../../../types"

const Footer = () => {
    const { data } = useQuery(FOOTER_PAGES)
    const footerLinks: PageType[] = data?.pages

    const { data: contactData } = useQuery(GET_CONTACT_PAGE)
    const contactPage: ContactPagesType = contactData?.contactPage

    const footerArr: FooterLinkType[] = footerLinks?.map(page => ({
        text: page.title,
        to: page.slug,
        order: page.orderFooter,
    }))

    if (contactPage?.footer && !contactPage?.hideContact) {
        footerArr?.push({
            text: contactPage?.title,
            to: "contact",
            order: contactPage?.orderFooter,
        })
    }

    return (
        <Styles.StyledFooter>
            <Flexbox alignItems="center" gap="xs">
                {footerArr
                    ?.sort((a, b) => (a.order < b.order ? -1 : 0))
                    .map(link => (
                        <Link to={link.to} key={uuid()}>
                            {link.text}
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
