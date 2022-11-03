/*=============================================== Create global ===============================================*/

import { gql } from "@apollo/client"

export const CREATE_GLOBAL = gql`
    mutation ($createGlobalInput: CreateGlobalInput) {
        createGlobal(createGlobalInput: $createGlobalInput) {
            _id
            name
            baseline
            favicon
            email
            cover
            language
        }
    }
`
