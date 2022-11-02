/*=============================================== PageLine component ===============================================*/

import React from "react"
import { Badge, Text, ButtonIcon } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import * as Styles from "./styles"
import { PageLineProps } from "./types"

const PageLine = ({ page: { _id, slug, title, draft } }: PageLineProps) => {
    return (
        <Styles.StyledPageLine>
            <Styles.BadgeContainer>
                <Badge size={8} color={draft ? "warning" : "success"} />
            </Styles.BadgeContainer>

            <Text tag="h6">
                <Link to={`/dashboard/pages/${_id}`}>{title}</Link>
            </Text>

            <ButtonIcon
                icon="file"
                variant="transparent"
                to={slug}
                label="See page"
                showLabel
                // @ts-expect-error
                target="_blank"
                rel="noreferrer noopener"
                size={24}
            />

            <ButtonIcon
                icon="edit"
                variant="transparent"
                to={`/dashboard/pages/${_id}`}
                size={24}
                label="Edit"
                showLabel
            />
        </Styles.StyledPageLine>
    )
}

export default PageLine
