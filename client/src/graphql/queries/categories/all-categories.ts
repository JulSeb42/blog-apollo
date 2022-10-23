/*=============================================== All categories ===============================================*/

import { gql } from "@apollo/client"

export const ALL_CATEGORIES = gql`
    query {
        categories {
            _id
            name
            posts {
                _id
            }
        }
    }
`
