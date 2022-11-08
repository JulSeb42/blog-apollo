/*=============================================== CardAuthor component ===============================================*/

import React from "react"
import { Avatar, Text } from "tsx-library-julseb"
import { slugify } from "../../../utils"
import { Link } from "react-router-dom"

import * as Styles from "./styles"
import { CardAuthorSmallProps } from "./types"

const CardAuthorSmall = ({
    author: { fullName, posts, imageUrl },
    readonly,
}: CardAuthorSmallProps) => {
    const length = posts.length

    return (
        <Styles.StyledCardAuthorSmall
            to={readonly ? undefined : `/authors/${slugify(fullName)}`}
            as={readonly ? "div" : Link}
            $readOnly={readonly}
        >
            <Avatar
                img={imageUrl}
                alt={`Avatar ${fullName}`}
                borderRadius="l"
            />

            <Text tag="h5">{fullName}</Text>

            {!readonly && (
                <Text tag="small" color="gray">
                    {length} post{length > 1 ? "s" : ""}
                </Text>
            )}
        </Styles.StyledCardAuthorSmall>
    )
}

export default CardAuthorSmall
