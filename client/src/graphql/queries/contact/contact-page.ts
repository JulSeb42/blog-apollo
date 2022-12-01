/*=============================================== Get contact page ===============================================*/

import { gql } from "@apollo/client"

export const GET_CONTACT_PAGE = gql`
    query {
        contactPage {
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
            header
            orderHeader
            footer
            orderFooter
        }
    }
`
