/*=============================================== CardPost component ===============================================*/

import React from "react"
import { Image, Flexbox, Text } from "tsx-library-julseb"
import { unslugify, convertDateShort } from "../../../utils"

import * as Styles from "./styles"
import { CardPostProps } from "./types"

const CardPost = ({
    post: { category, date, title, imageUrl, body, slug, metaDescription },
}: CardPostProps) => {
    return (
        <Styles.StyledCardPost to={`/posts/${slug}`}>
            <Styles.ImgContainer>
                <Image
                    src={imageUrl}
                    alt={`Cover ${title}`}
                    height={150}
                />
            </Styles.ImgContainer>

            <Flexbox alignItems="center" gap="xs">
                <Text tag="small">
                    <Text tag="strong">{unslugify(category.name)}</Text>
                </Text>

                <Text tag="small" color="gray">
                    {convertDateShort(new Date(date))}
                </Text>
            </Flexbox>

            <Styles.Title tag="h6">{title}</Styles.Title>

            <Styles.Body>{metaDescription}</Styles.Body>
        </Styles.StyledCardPost>
    )
}

export default CardPost
