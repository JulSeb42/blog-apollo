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
    dashboard,
}: CardAuthorProps) => {
    return (
        <Styles.StyledCardAuthor>
            <Flexbox alignItems="center" gap="xs">
                <Avatar
                    img={imageUrl}
                    alt={`Avatar ${fullName}`}
                    size={profile ? 32 : 64}
                />

                <Text tag={dashboard ? "h1" : "h4"}>
                    {dashboard ? "Hello " : ""}
                    {fullName}
                </Text>
            </Flexbox>

            <Text>{bio}</Text>

            {(profile || dashboard) && (
                <Text>
                    <Link
                        to={`/authors/${slugify(fullName)}`}
                        target={dashboard ? "_blank" : ""}
                        rel={dashboard ? "noreferrer noopener" : ""}
                    >
                        Check {dashboard ? "your" : "their"} profile.
                    </Link>
                </Text>
            )}
        </Styles.StyledCardAuthor>
    )
}

export default CardAuthor
