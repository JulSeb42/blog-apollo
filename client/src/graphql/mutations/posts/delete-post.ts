/*=============================================== Delete post ===============================================*/

import { gql } from "@apollo/client"

export const DELETE_POST = gql`
    mutation ($_id: ID!) {
        deletePost(_id: $_id)
    }
`
