/*=============================================== Delete page ===============================================*/

import { gql } from "@apollo/client"

export const DELETE_PAGE = gql`
    mutation ($_id: ID!) {
        deletePage(_id: $_id)
    }
`
