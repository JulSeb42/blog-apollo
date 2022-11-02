/*=============================================== Featured authors ===============================================*/

import { gql } from "@apollo/client"

export const FEATURED_AUTHORS = gql`
    query {
        users(filters: { approved: true }) {
            _id
            fullName
            imageUrl
            posts {
                _id
            }
        }
    }
`
