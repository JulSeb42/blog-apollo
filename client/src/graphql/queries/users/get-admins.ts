/*=============================================== Get admins ===============================================*/

import { gql } from "@apollo/client"

export const GET_ADMIN = gql`
    query {
        users(filters: { role: admin, approved: true }) {
            _id
            email
            fullName
        }
    }
`
