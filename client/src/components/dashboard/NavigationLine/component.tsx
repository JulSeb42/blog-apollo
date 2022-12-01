/*=============================================== NavigationLine component ===============================================*/

import React, { useState } from "react"
import { Text, InputCheck, Input, Flexbox, Loader } from "tsx-library-julseb"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"

import CheckCircle from "../../icons/CheckCircle"

import * as Styles from "./styles"
import { NavigationLineProps } from "./types"

import { PAGES_NAVIGATION, GET_CONTACT_PAGE } from "../../../graphql/queries"
import { SHOW_PAGE, SHOW_CONTACT } from "../../../graphql/mutations"

const NavigationLine = ({ page, contact }: NavigationLineProps) => {
    const {
        _id,
        title,
        header: isInHeader,
        orderHeader: orderInHeader,
        footer: isInFooter,
        orderFooter: orderInFooter,
    } = page || contact
    const disableShow = page ? page.draft : contact.hideContact

    const [header, setHeader] = useState(isInHeader)
    const [orderHeader, setOrderHeader] = useState(orderInHeader)
    const [footer, setFooter] = useState(isInFooter)
    const [orderFooter, setOrderFooter] = useState(orderInFooter)

    const [showPage, { loading }] = useMutation(SHOW_PAGE)
    const [showContact, { loading: showContactLoading }] =
        useMutation(SHOW_CONTACT)

    const handleHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeader(e.target.checked)

        const showPageFn = () =>
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
            }).then(() =>
                toast(
                    `${title} is ${
                        e.target.checked ? "now" : "not"
                    } visible in header!`,
                    { icon: <CheckCircle /> }
                )
            )

        const showContactFn = () =>
            showContact({
                variables: {
                    showContactInput: {
                        _id,
                        header: e.target.checked,
                        orderHeader,
                        footer,
                        orderFooter,
                    },
                },

                refetchQueries: [
                    {
                        query: GET_CONTACT_PAGE,
                    },
                ],
            }).then(() =>
                toast(
                    `${title} is ${
                        e.target.checked ? "now" : "not"
                    } visible in header!`,
                    { icon: <CheckCircle /> }
                )
            )

        page ? showPageFn() : showContactFn()
    }

    const handleOrderHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderHeader(parseFloat(e.target.value))

        const showPageFn = () =>
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
            }).then(() =>
                toast(`${title} order in header has been changed!`, {
                    icon: <CheckCircle />,
                })
            )

        const showContactFn = () =>
            showContact({
                variables: {
                    showContactInput: {
                        _id,
                        header,
                        orderHeader: parseFloat(e.target.value),
                        footer,
                        orderFooter,
                    },
                },

                refetchQueries: [
                    {
                        query: GET_CONTACT_PAGE,
                    },
                ],
            }).then(() =>
                toast(`${title} order in header has been changed!`, {
                    icon: <CheckCircle />,
                })
            )

        page ? showPageFn() : showContactFn()
    }

    const handleFooter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFooter(e.target.checked)

        const showPageFn = () =>
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
            }).then(() =>
                toast(
                    `${title} is ${
                        e.target.checked ? "now" : "not"
                    } visible in footer!`,
                    {
                        icon: <CheckCircle />,
                    }
                )
            )

        const showContactFn = () =>
            showContact({
                variables: {
                    showContactInput: {
                        _id,
                        header,
                        orderHeader,
                        footer: e.target.checked,
                        orderFooter,
                    },
                },

                refetchQueries: [
                    {
                        query: GET_CONTACT_PAGE,
                    },
                ],
            }).then(() =>
                toast(
                    `${title} is ${
                        e.target.checked ? "now" : "not"
                    } visible in footer!`,
                    {
                        icon: <CheckCircle />,
                    }
                )
            )

        page ? showPageFn() : showContactFn()
    }

    const handleOrderFooter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderFooter(parseFloat(e.target.value))

        const showPageFn = () =>
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
            }).then(() =>
                toast(`${title} order in footer has been changed!`, {
                    icon: <CheckCircle />,
                })
            )

        const showContactFn = () =>
            showContact({
                variables: {
                    showContactInput: {
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
            }).then(() =>
                toast(`${title} order in footer has been changed!`, {
                    icon: <CheckCircle />,
                })
            )

        page ? showPageFn() : showContactFn()
    }

    return (
        <Styles.StyledNavigationLine>
            <Text>{title}</Text>

            <Flexbox gap="xs" alignItems="center" justifyContent="flex-start">
                {(loading || showContactLoading) && (
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
                    disabled={disableShow}
                />
            </Flexbox>

            <Flexbox gap="xs" alignItems="center" justifyContent="flex-start">
                {(loading || showContactLoading) && (
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
                    disabled={
                        page
                            ? !page.header || page.draft
                            : !contact.header || contact.hideContact
                    }
                    min={0}
                />
            </Flexbox>

            <Flexbox gap="xs" alignItems="center" justifyContent="flex-start">
                {(loading || showContactLoading) && (
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
                    disabled={disableShow}
                />
            </Flexbox>

            <Flexbox gap="xs" alignItems="center" justifyContent="flex-start">
                {(loading || showContactLoading) && (
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
                    disabled={
                        page
                            ? !page.footer || page.draft
                            : !contact?.footer || contact?.hideContact
                    }
                    min={0}
                />
            </Flexbox>
        </Styles.StyledNavigationLine>
    )
}

export default NavigationLine
