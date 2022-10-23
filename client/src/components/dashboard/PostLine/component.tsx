/*=============================================== PostLine component ===============================================*/

import React from "react"
import { convertDateShort, slugify } from "ts-utils-julseb"
import { Flexbox, Badge, Text, ButtonIcon } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import * as Styles from "./styles"
import { PostLineProps } from "./types"

const PostLine = ({
    post: { _id, title, draft, slug, author, date, time, category },
    noBorder,
}: PostLineProps) => {
    return (
        <Styles.StyledPostLine $noBorder={noBorder}>
            <Badge size={8} color={draft ? "warning" : "success"} />

            <Flexbox flexDirection="column" gap="xxs">
                <Text tag="h6">
                    <Link to={`/dashboard/posts/${_id}`}>{title}</Link>
                </Text>

                <Text>
                    Published by{" "}
                    <Link
                        to={`/authors/${slugify(author.fullName)}`}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {author.fullName}
                    </Link>{" "}
                    on {convertDateShort(new Date(date))} at {time}
                </Text>
            </Flexbox>

            <Flexbox gap="xs">
                <ButtonIcon
                    size={24}
                    icon="file"
                    variant="transparent"
                    to={`/posts/${category.name}/${slug}`}
                    // @ts-expect-error
                    target="_blank"
                    rel="noreferrer noopener"
                />
                
                <ButtonIcon
                    size={24}
                    icon="edit"
                    variant="transparent"
                    to={`/dashboard/posts/${_id}`}
                />
            </Flexbox>
        </Styles.StyledPostLine>
    )
}

export default PostLine
