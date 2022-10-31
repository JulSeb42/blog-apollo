/*=============================================== Footer component ===============================================*/

import React from "react"
import { Text, Flexbox } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/client"

import * as Styles from "./styles"

import siteData from "../../../data/site-data"
import { FOOTER_PAGES } from "../../../graphql/queries"
import { PageType } from "../../../types"

const Footer = () => {
    const { data } = useQuery(FOOTER_PAGES)
    const footerLinks: PageType[] = data?.pages

    return (
        <Styles.StyledFooter>
            <Flexbox alignItems="center" gap="xs">
                {footerLinks?.map(page => (
                    <Link to={`/${page.slug}`} key={page._id}>
                        {page.title}
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
