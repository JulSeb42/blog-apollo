/*=============================================== Delete user ===============================================*/

import { gql } from "@apollo/client"

const DELETE_USER = gql`
    mutation ($_id: ID!) {
        deleteUser(_id: $_id)
    }
`

export { DELETE_USER }
