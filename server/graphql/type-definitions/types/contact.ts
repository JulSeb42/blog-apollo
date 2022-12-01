/*=============================================== Contact type ===============================================*/

import { gql } from "apollo-server"

export const ContactType = gql`
    type Contact {
        _id: ID!

        title: String
        body: String
        hideContact: Boolean
        showForm: Boolean

        labelName: String
        labelEmail: String
        labelSubject: String
        labelMessage: String
        labelButton: String

        header: Boolean
        orderHeader: Int
        footer: Boolean
        orderFooter: Int
    }
`
