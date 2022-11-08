/*=============================================== Setup global ===============================================*/

import { gql } from "@apollo/client"

export const SETUP_GLOBAL = gql`
    mutation ($_id: ID!) {
        setupGlobal(_id: $_id) {
            _id
            name
            baseline
            cover
            favicon
            language
            isGlobalSetup
        }
    }
`
