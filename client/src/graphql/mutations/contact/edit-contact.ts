/*=============================================== Edit contact ===============================================*/

import { gql } from "@apollo/client"

export const EDIT_CONTACT_PAGE = gql`
    mutation ($contactPageInput: ContactPageInput) {
        editContact(contactPageInput: $contactPageInput) {
            _id
            hideContact
            title
            body
            showForm
            labelName
            labelSubject
            labelEmail
            labelMessage
            labelButton
        }
    }
`
