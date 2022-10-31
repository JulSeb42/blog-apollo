/*=============================================== Users dashboard ===============================================*/

import { gql } from "@apollo/client"

export const USERS_DASHBOARD = gql`
    query {
        users {
            _id
            fullName
            approved
            role
            featured
        }
    }
`
