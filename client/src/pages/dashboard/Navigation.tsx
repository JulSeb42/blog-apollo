/*=============================================== Navigation ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"
import { useQuery } from "@apollo/client"

import PageDashboard from "../../components/dashboard/PageDashboard"
import HeaderListUsers from "../../components/dashboard/HeaderListUsers"
import ListCards from "../../components/dashboard/ListCards"
import NavigationLine from "../../components/dashboard/NavigationLine"

import { PAGES_NAVIGATION } from "../../graphql/queries"
import { PageType } from "../../types"
import siteData from "../../data/site-data"

const Navigation = () => {
    const { data, loading, error } = useQuery(PAGES_NAVIGATION)
    const pages: PageType[] = data?.pages.filter(
        (page: PageType) => page._id !== siteData.thankYouId
    )

    return (
        <PageDashboard
            title="Navigation items"
            role="admin"
            isLoading={loading}
            error={error?.message}
        >
            <Text tag="h1">Navigation items</Text>

            <HeaderListUsers $isNavigation>
                <Text tag="h6">Page title</Text>
                <Text tag="h6">In header</Text>
                <Text tag="h6">Position in header</Text>
                <Text tag="h6">In footer</Text>
                <Text tag="h6">Position in footer</Text>
            </HeaderListUsers>

            <ListCards>
                {pages?.map(page => (
                    <NavigationLine page={page} key={page._id} />
                ))}
            </ListCards>
        </PageDashboard>
    )
}

export default Navigation
