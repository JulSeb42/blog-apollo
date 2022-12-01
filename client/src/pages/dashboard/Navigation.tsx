/*=============================================== Navigation ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"

import PageDashboard from "../../components/dashboard/PageDashboard"
import HeaderListUsers from "../../components/dashboard/HeaderListUsers"
import ListCards from "../../components/dashboard/ListCards"
import NavigationLine from "../../components/dashboard/NavigationLine"

import { PAGES_NAVIGATION, GET_CONTACT_PAGE } from "../../graphql/queries"
import { PageType, ContactPagesType } from "../../types"

const Navigation = () => {
    const { data, loading, error } = useQuery(PAGES_NAVIGATION)
    const {
        data: contactData,
        loading: contactLoading,
        error: contactError,
    } = useQuery(GET_CONTACT_PAGE)

    const pages: PageType[] = data?.pages
    const contactPage: ContactPagesType = contactData?.contactPage

    return (
        <PageDashboard
            title="Navigation items"
            role="admin"
            isLoading={loading || contactLoading}
            error={error?.message || contactError?.message}
        >
            <Text tag="h1">Navigation items</Text>

            {pages?.length > 0 || !contactPage?.hideContact ? (
                <ListCards>
                    <HeaderListUsers $isNavigation>
                        <Text tag="h6">Page title</Text>
                        <Text tag="h6">In header</Text>
                        <Text tag="h6">Position in header</Text>
                        <Text tag="h6">In footer</Text>
                        <Text tag="h6">Position in footer</Text>
                    </HeaderListUsers>

                    {!contactPage?.hideContact && (
                        <NavigationLine contact={contactPage} />
                    )}

                    {pages?.map(page => (
                        <NavigationLine page={page} key={page._id} />
                    ))}
                </ListCards>
            ) : (
                <Text>
                    There is no page yet.{" "}
                    <Link to="/dashboard/pages/new-page">Add one.</Link>
                </Text>
            )}
        </PageDashboard>
    )
}

export default Navigation
