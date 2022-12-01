/*=============================================== ContactLine component ===============================================*/

import React from "react"
import { Text, ButtonIcon, Flexbox } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { unslugify } from "../../../utils"

import { ContactLineProps } from "./types"

const ContactLine = ({ title }: ContactLineProps) => {
    return (
        <Flexbox alignItems="center" justifyContent="space-between">
            <Text>
                <Link to={`/dashboard/contact/edit-${title}`}>
                    {unslugify(title)}
                </Link>
            </Text>

            <Flexbox gap="xs">
                <ButtonIcon
                    icon="edit"
                    label="Edit page"
                    to={`/dashboard/contact/edit-${title}`}
                    showLabel
                    size={24}
                    variant="transparent"
                />

                <ButtonIcon
                    icon="file"
                    label="Show page"
                    to={
                        title === "thank-you"
                            ? "/contact/thank-you"
                            : `/${title}`
                    }
                    showLabel
                    size={24}
                    variant="transparent"
                    // @ts-expect-error
                    target="_blank"
                    rel="noreferrer noopener"
                />
            </Flexbox>
        </Flexbox>
    )
}

export default ContactLine
