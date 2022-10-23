/*=============================================== Category by id ===============================================*/

import { gql } from "@apollo/client"

export const CATEGORY_BY_ID = gql`
    query ($_id: ID!) {
        categoryById(_id: $_id) {
            name
        }
    }
`
