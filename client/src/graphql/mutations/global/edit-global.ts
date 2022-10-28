/*=============================================== Edit global data ===============================================*/

import { gql } from "@apollo/client"

export const EDIT_GLOBAL = gql`
    mutation ($globalInput: GlobalInput) {
        editGlobal(globalInput: $globalInput) {
            _id
            name
            baseline
            metaDescription
            favicon
            email
            cover
            keywords
            language
        }
    }
`
