/*=============================================== CardComment component ===============================================*/

import React from "react"
import { convertDateShort } from "../../../utils"
import { Text, Grid } from "tsx-library-julseb"
import Linkify from "react-linkify"
import { getToday } from "../../../utils"

import * as Styles from "./styles"
import { CardCommentProps } from "./types"

const CardComment = ({
    comment: { poster, date, time, body },
}: CardCommentProps) => {
    return (
        <Styles.StyledCardComment>
            <Grid gap="xxs">
                <Text tag="h4">{poster}</Text>
                <Text tag="small" color="gray">
                    Posted{" "}
                    {date !== getToday() &&
                        `on ${convertDateShort(new Date(date))} `}
                    at {time}
                </Text>
            </Grid>

            <Text>
                <Linkify>{body}</Linkify>
            </Text>
        </Styles.StyledCardComment>
    )
}

export default CardComment
