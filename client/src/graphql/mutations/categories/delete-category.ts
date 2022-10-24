/*=============================================== Delete category ===============================================*/

import { gql } from "@apollo/client"

export const DELETE_CATEGORY = gql`
    mutation ($_id: ID!) {
        deleteCategory(_id: $_id)
    }
`
