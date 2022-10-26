/*=============================================== Delete comment ===============================================*/

import { gql } from "@apollo/client"

export const DELETE_COMMENT = gql`
    mutation ($_id: ID!) {
        deleteComment(_id: $_id)
    }
`
