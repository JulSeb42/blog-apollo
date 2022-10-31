/*=============================================== CommentLine component ===============================================*/

import React, { useState } from "react"
import {
    Text,
    Flexbox,
    ButtonIcon,
    Grid,
    Alert,
    Button,
} from "tsx-library-julseb"
import { convertDateShort } from "../../../utils"
import { Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"

import CheckCircle from "../../icons/CheckCircle"

import * as Styles from "./styles"
import { CommentLineProps } from "./types"

import { ALL_COMMENTS } from "../../../graphql/queries"
import { DELETE_COMMENT } from "../../../graphql/mutations"

const CommentLine = ({
    comment: { _id, poster, post, body, date, time },
}: CommentLineProps) => {
    const [deleteComment, { loading }] = useMutation(DELETE_COMMENT)

    const handleDelete = () => {
        deleteComment({
            variables: {
                _id,
            },
            refetchQueries: [
                {
                    query: ALL_COMMENTS,
                },
            ],
        }).then(() =>
            toast("This comment was deleted", { icon: <CheckCircle /> })
        )
    }

    const [isOpen, setIsOpen] = useState(false)
    return (
        <Styles.StyledCommentLine>
            <Grid gap="xxs">
                <Flexbox justifyContent="space-between" gap="xs">
                    <Text tag="h6">{poster}</Text>

                    <ButtonIcon
                        icon="trash"
                        color="danger"
                        variant="transparent"
                        size={24}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </Flexbox>

                <Text tag="small" color="gray">
                    {convertDateShort(new Date(date))} at {time}
                </Text>

                <Text tag="small" color="gray">
                    Posted in{" "}
                    <Link
                        to={`/posts/${post.category.name}/${post.slug}`}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        {post.title}
                    </Link>
                </Text>
            </Grid>

            <Text>{body}</Text>

            {isOpen && (
                <Alert color="danger">
                    <Text>Are you sure you want to delete this comment?</Text>

                    <Flexbox>
                        <Button
                            color="danger"
                            isLoading={loading}
                            onClick={handleDelete}
                        >
                            Yes, delete it
                        </Button>
                        <Button variant="text" onClick={() => setIsOpen(false)}>
                            No, cancel
                        </Button>
                    </Flexbox>
                </Alert>
            )}
        </Styles.StyledCommentLine>
    )
}

export default CommentLine
