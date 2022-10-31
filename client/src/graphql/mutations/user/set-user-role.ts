/*=============================================== Set user role ===============================================*/

import { gql } from "@apollo/client"

export const SET_USER_ROLE = gql`
    mutation ($setUserRoleInput: SetUserRoleInput) {
        setUserRole(setUserRoleInput: $setUserRoleInput) {
            _id
            fullName
            approved
            role
            featured
        }
    }
`
