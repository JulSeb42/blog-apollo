/*=============================================== CardAuthor component ===============================================*/

import React from "react"
import { Avatar, Text } from "tsx-library-julseb"
import { slugify } from "../../../utils"

import * as Styles from "./styles"
import { CardAuthorSmallProps } from "./types"

const CardAuthorSmall = ({
    author: { fullName, posts, imageUrl },
}: CardAuthorSmallProps) => {
    const length = posts.length

    return (
        <Styles.StyledCardAuthorSmall to={`/authors/${slugify(fullName)}`}>
            <Avatar
                img={imageUrl}
                alt={`Avatar ${fullName}`}
                borderRadius="l"
            />

            <Text tag="h5">{fullName}</Text>

            <Text tag="small" color="gray">
                {length} post{length > 1 ? "s" : ""}
            </Text>
        </Styles.StyledCardAuthorSmall>
    )
}

export default CardAuthorSmall
