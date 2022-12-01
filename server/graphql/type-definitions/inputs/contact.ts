/*=============================================== Contact input ===============================================*/

import { gql } from "apollo-server"

export const ContactInput = gql`
    input ContactInput {
        name: String!
        email: String!
        subject: String!
        message: String!
    }

    input ContactPageInput {
        _id: ID!

        hideContact: Boolean

        title: String
        body: String

        showForm: Boolean
        
        labelName: String
        labelEmail: String
        labelSubject: String
        labelMessage: String
        labelButton: String
    }

    input ShowContactInput {
        _id: ID!
        header: Boolean
        orderHeader: Int
        footer: Boolean
        orderFooter: Int
    }
`
