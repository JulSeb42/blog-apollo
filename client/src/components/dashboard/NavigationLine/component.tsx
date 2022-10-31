/*=============================================== NavigationLine component ===============================================*/

import React, { useState } from "react"
import { Text, InputCheck, Input, Flexbox, Loader } from "tsx-library-julseb"
import { useMutation } from "@apollo/client"

import * as Styles from "./styles"
import { NavigationLineProps } from "./types"

import { PAGES_NAVIGATION } from "../../../graphql/queries"
import { SHOW_PAGE } from "../../../graphql/mutations"

const NavigationLine = ({
    page: {
        _id,
        title,
        header: isInHeader,
        orderHeader: orderInHeader,
        footer: isInFooter,
        orderFooter: orderInFooter,
    },
}: NavigationLineProps) => {
    const [header, setHeader] = useState(isInHeader)
    const [orderHeader, setOrderHeader] = useState(orderInHeader)
    const [footer, setFooter] = useState(isInFooter)
    const [orderFooter, setOrderFooter] = useState(orderInFooter)

    const [showPage, { loading }] = useMutation(SHOW_PAGE)

    const handleHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeader(e.target.checked)

        showPage({
            variables: {
                showPageInput: {
                    _id,
                    header: e.target.checked,
                    orderHeader,
                    footer,
                    orderFooter,
                },
            },

            refetchQueries: [
                {
                    query: PAGES_NAVIGATION,
                },
            ],
        })
    }

    const handleOrderHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderHeader(parseFloat(e.target.value))

        showPage({
            variables: {
                showPageInput: {
                    _id,
                    header,
                    orderHeader: parseFloat(e.target.value),
                    footer,
                    orderFooter,
                },
            },

            refetchQueries: [
                {
                    query: PAGES_NAVIGATION,
                },
            ],
        })
    }

    const handleFooter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFooter(e.target.checked)

        showPage({
            variables: {
                showPageInput: {
                    _id,
                    header,
                    orderHeader,
                    footer: e.target.checked,
                    orderFooter,
                },
            },

            refetchQueries: [
                {
                    query: PAGES_NAVIGATION,
                },
            ],
        })
    }

    const handleOrderFooter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderFooter(parseFloat(e.target.value))

        showPage({
            variables: {
                showPageInput: {
                    _id,
                    header,
                    orderHeader,
                    footer,
                    orderFooter: parseFloat(e.target.value),
                },
            },

            refetchQueries: [
                {
                    query: PAGES_NAVIGATION,
                },
            ],
        })
    }

    return (
        <Styles.StyledNavigationLine>
            <Text>{title}</Text>

            <Flexbox gap="xs" alignItems="center" justifyContent="flex-start">
                {loading && (
                    <Loader
                        size={24}
                        variant={1}
                        borderSize={4}
                        color="primary"
                    />
                )}

                <InputCheck
                    id={`header-${_id}`}
                    label="Show"
                    checkStyle="toggle"
                    type="checkbox"
                    defaultChecked={header}
                    onChange={handleHeader}
                />
            </Flexbox>

            <Flexbox gap="xs" alignItems="center" justifyContent="flex-start">
                {loading && (
                    <Loader
                        size={24}
                        variant={1}
                        borderSize={4}
                        color="primary"
                    />
                )}

                <Input
                    id={`headerPosition-${_id}`}
                    type="number"
                    step={1}
                    value={orderHeader}
                    onChange={handleOrderHeader}
                    disabled={!header}
                    min={0}
                />
            </Flexbox>

            <Flexbox gap="xs" alignItems="center" justifyContent="flex-start">
                {loading && (
                    <Loader
                        size={24}
                        variant={1}
                        borderSize={4}
                        color="primary"
                    />
                )}

                <InputCheck
                    id={`footer-${_id}`}
                    label="Show"
                    checkStyle="toggle"
                    type="checkbox"
                    defaultChecked={footer}
                    onChange={handleFooter}
                />
            </Flexbox>

            <Flexbox gap="xs" alignItems="center" justifyContent="flex-start">
                {loading && (
                    <Loader
                        size={24}
                        variant={1}
                        borderSize={4}
                        color="primary"
                    />
                )}

                <Input
                    id={`footerPosition-${_id}`}
                    type="number"
                    step={1}
                    value={orderFooter}
                    onChange={handleOrderFooter}
                    disabled={!footer}
                    min={0}
                />
            </Flexbox>
        </Styles.StyledNavigationLine>
    )
}

export default NavigationLine