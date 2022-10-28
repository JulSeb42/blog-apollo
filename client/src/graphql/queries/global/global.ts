/*=============================================== Global data ===============================================*/

import { gql } from "@apollo/client"

export const GLOBAL_DATA = gql`
    query {
        globalData {
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
