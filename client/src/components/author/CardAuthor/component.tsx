/*=============================================== CardAuthor component ===============================================*/

import React from "react"
import { Avatar, Flexbox, Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { slugify } from "../../../utils"

import * as Styles from "./styles"
import { CardAuthorProps } from "./types"

const CardAuthor = ({
    author: { bio, imageUrl, fullName },
    profile,
}: CardAuthorProps) => {
    return (
        <Styles.StyledCardAuthor>
            <Flexbox alignItems="center" gap="xs">
                <Avatar
                    img={imageUrl}
                    alt={`Avatar ${fullName}`}
                    size={profile ? 32 : 64}
                />

                <Text tag="h4">{fullName}</Text>
            </Flexbox>

            <Text>{bio}</Text>

            {profile && (
                <Text>
                    <Link to={`/authors/${slugify(fullName)}`}>
                        Check their profile.
                    </Link>
                </Text>
            )}
        </Styles.StyledCardAuthor>
    )
}

export default CardAuthor
