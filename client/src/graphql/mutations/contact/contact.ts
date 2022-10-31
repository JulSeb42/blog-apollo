/*=============================================== Contact ===============================================*/

import { gql } from "@apollo/client"

export const CONTACT = gql`
    mutation ($contactInput: ContactInput) {
        contact(contactInput: $contactInput)
    }
`
