/*=============================================== Edit thank you ===============================================*/

import { gql } from "@apollo/client"

export const EDIT_THANK_YOU = gql`
    mutation ($thankYouInput: ThankYouInput) {
        editThankYou(thankYouInput: $thankYouInput) {
            _id
            title
            body
        }
    }
`
