/*=============================================== TitleDashboard ===============================================*/

import React from "react"
import { Text, Flexbox, Button } from "tsx-library-julseb"

import { useMaxWidth } from "../../hooks"

const TitleDashboard = ({ title, buttonText, buttonTo, tag = "h1" }: Props) => {
    const isSmaller = useMaxWidth(768)

    return (
        <Flexbox
            justifyContent="space-between"
            alignItems="center"
            flexWrap={isSmaller ? "wrap" : "nowrap"}
            gap="xs"
        >
            <Text tag={tag}>{title}</Text>

            <Button to={buttonTo}>{buttonText}</Button>
        </Flexbox>
    )
}

export default TitleDashboard

interface Props extends React.HTMLAttributes<HTMLElement> {
    title: string
    buttonText: string
    buttonTo: string
    tag?: "h1" | "h2"
}
