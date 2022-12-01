/*=============================================== Get thank you ===============================================*/

import { gql } from "@apollo/client"

export const GET_THANK_YOU = gql`
    query {
        thankYouPage {
            _id
            title
            body
        }
    }
`
