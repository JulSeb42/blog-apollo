/*=============================================== Show contact mutation ===============================================*/

import { gql } from "@apollo/client"

export const SHOW_CONTACT = gql`
    mutation ($showContactInput: ShowContactInput) {
        showContact(showContactInput: $showContactInput) {
            _id
            title
            header
            orderHeader
            footer
            orderFooter
        }
    }
`
