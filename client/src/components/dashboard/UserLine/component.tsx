/*=============================================== UserLine component ===============================================*/

import React, { useState } from "react"
import {
    Flexbox,
    Badge,
    Text,
    Input,
    InputCheck,
    ButtonIcon,
    Loader,
    Alert,
    Button,
} from "tsx-library-julseb"
import { Link } from "react-router-dom"
import { slugify } from "../../../utils"
import { useMutation } from "@apollo/client"
import toast from "react-hot-toast"

import CheckCircle from "../../icons/CheckCircle"

import {
    SET_USER_ROLE,
    FEATURE_USER,
    APPROVE_USER,
    DELETE_USER,
} from "../../../graphql/mutations"
import { USERS_DASHBOARD } from "../../../graphql/queries"

import * as Styles from "./styles"
import { UserLineProps } from "./types"

const UserLine = ({
    user: { fullName, approved, _id, role: userRole, featured: userFeatured },
    allUsers,
}: UserLineProps) => {
    const admins = allUsers.filter(user => user.role === "admin")
    const disableOneAdmin =
        userRole === "admin" && admins.length === 1 ? true : false

    const [role, setRole] = useState<"admin" | "moderator" | "writer">(userRole)
    const [setUserRole, { loading: roleLoading }] = useMutation(SET_USER_ROLE)

    const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // @ts-expect-error
        setRole(e.target.value)

        setUserRole({
            variables: {
                setUserRoleInput: {
                    _id,
                    role: e.target.value,
                },
            },

            refetchQueries: [
                {
                    query: USERS_DASHBOARD,
                },
            ],
        }).then(() =>
            toast(`${fullName} role was successfully edited!`, {
                icon: <CheckCircle />,
            })
        )
    }

    const [featured, setFeatured] = useState<boolean>(userFeatured)
    const [featureUser, { loading: featureLoading }] = useMutation(FEATURE_USER)

    const handleFeatured = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeatured(e.target.checked)

        featureUser({
            variables: {
                featureUserInput: {
                    _id,
                    featured: e.target.checked,
                },
            },

            refetchQueries: [
                {
                    query: USERS_DASHBOARD,
                },
            ],
        }).then(() =>
            toast(
                `${fullName} is now ${e.target.checked ? "not " : ""}featured!`,
                { icon: <CheckCircle /> }
            )
        )
    }

    const [approveUser, { loading: approveLoading }] = useMutation(APPROVE_USER)

    const handleApprove = (e: React.MouseEvent<HTMLButtonElement>) => {
        approveUser({
            variables: {
                approveUserInput: {
                    _id,
                    approved: true,
                },
            },

            refetchQueries: [
                {
                    query: USERS_DASHBOARD,
                },
            ],
        }).then(() =>
            toast(`${fullName} is now approved!`, { icon: <CheckCircle /> })
        )
    }

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER)

    const handleDelete = () => {
        deleteUser({
            variables: {
                _id,
            },
            refetchQueries: [
                {
                    query: USERS_DASHBOARD,
                },
            ],
        }).then(() =>
            toast(`${fullName} was successfully deleted!`, {
                icon: <CheckCircle />,
            })
        )
    }

    return (
        <Styles.StyledUserLine>
            <Styles.Content>
                <Flexbox gap="xs" alignItems="flex-start">
                    <Styles.BadgeContainer>
                        <Badge
                            size={8}
                            color={approved ? "success" : "warning"}
                        />
                    </Styles.BadgeContainer>

                    <Text>
                        <Link
                            to={`/authors/${slugify(fullName)}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            {fullName}
                        </Link>
                    </Text>
                </Flexbox>

                <Flexbox
                    gap="xs"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    {roleLoading && (
                        <Loader
                            size={24}
                            variant={1}
                            borderSize={4}
                            color="primary"
                        />
                    )}

                    <Input
                        id={`role-${_id}`}
                        type="select"
                        disabled={disableOneAdmin}
                        helperBottom={
                            disableOneAdmin
                                ? "At least one admin is required."
                                : undefined
                        }
                        value={role}
                        onChange={handleRole}
                    >
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="writer">Writer</option>
                    </Input>
                </Flexbox>

                <Flexbox>
                    {featureLoading && (
                        <Loader
                            size={24}
                            variant={1}
                            borderSize={4}
                            color="primary"
                        />
                    )}

                    <InputCheck
                        id={`featured-${_id}`}
                        label="Featured"
                        defaultChecked={featured}
                        onChange={handleFeatured}
                        checkStyle="toggle"
                        type="checkbox"
                    />
                </Flexbox>

                <Flexbox alignItems="center" gap="xs">
                    {approveLoading && (
                        <Loader
                            size={24}
                            variant={1}
                            borderSize={4}
                            color="primary"
                        />
                    )}

                    <ButtonIcon
                        icon="check"
                        color="success"
                        size={24}
                        disabled={approved}
                        variant="transparent"
                        onClick={handleApprove}
                    />

                    <ButtonIcon
                        icon="trash"
                        color="danger"
                        size={24}
                        variant="transparent"
                        onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                    />
                </Flexbox>
            </Styles.Content>

            {isDeleteOpen && (
                <Alert color="danger">
                    <Text>Are you sure you want to delete {fullName}?</Text>

                    <Flexbox gap="xs">
                        <Button
                            color="danger"
                            onClick={handleDelete}
                            isLoading={deleteLoading}
                        >
                            Yes, delete this user
                        </Button>

                        <Button
                            variant="text"
                            onClick={() => setIsDeleteOpen(false)}
                        >
                            No, cancel
                        </Button>
                    </Flexbox>
                </Alert>
            )}
        </Styles.StyledUserLine>
    )
}

export default UserLine
