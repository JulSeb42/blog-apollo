/*=============================================== Search ===============================================*/

import React, { useState, useRef, useEffect } from "react"
import {
    ButtonIcon,
    Modal,
    Form,
    Input,
    Text,
    ThemeLight,
    Spacers,
    Radiuses,
    Shadows,
} from "tsx-library-julseb"
import styled from "styled-components/macro"
import { createSearchParams, useNavigate } from "react-router-dom"
import { useKeyPress, useClickOutside } from "../../hooks"

const Search = () => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value)

    const close = () => {
        setIsOpen(false)
        setSearch("")
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        navigate({
            pathname: "/search",
            search: createSearchParams({
                query: search,
                page: "1",
            }).toString(),
        })
    }

    useKeyPress(() => {
        if (!isOpen) {
            setIsOpen(true)
        } else {
            close()
        }
    }, ["Command", "KeyK"])

    const ref = useRef<any>(null)
    const containerRef = useRef<any>(null)

    const onClickOutside = () => close()
    useClickOutside(containerRef, onClickOutside)

    useEffect(() => {
        if (isOpen) {
            ref.current.focus()
        }
    }, [isOpen])

    return (
        <>
            <ButtonIcon
                icon="search"
                onClick={() => setIsOpen(true)}
                size={24}
            />

            <Modal isOpen={isOpen}>
                <Content ref={containerRef}>
                    <Text tag="h4">Search posts</Text>

                    <Form
                        buttonPrimary="Search"
                        buttonSecondary={{
                            text: "Cancel",
                            onClick: close,
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Input
                            id="global-search"
                            label="Search"
                            value={search}
                            onChange={handleSearch}
                            ref={ref}
                        />
                    </Form>
                </Content>
            </Modal>
        </>
    )
}

export default Search

const Content = styled.div`
    background-color: ${ThemeLight.White};
    width: 100%;
    padding: ${Spacers.S};
    max-width: calc(400px + ${Spacers.S} * 2);
    border-radius: ${Radiuses.M};
    box-shadow: ${Shadows.M};
`
