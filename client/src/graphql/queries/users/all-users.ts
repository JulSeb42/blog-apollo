/*=============================================== All users ===============================================*/

import { gql } from "@apollo/client"

export const ALL_USERS = gql`
    query {
        users {
            _id
            fullName
            imageUrl
            posts {
                _id
            }
        }
    }
`
