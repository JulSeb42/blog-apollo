/*=============================================== Approve user ===============================================*/

import { gql } from "@apollo/client"

export const APPROVE_USER = gql`
    mutation ($approveUserInput: ApproveUserInput) {
        approveUser(approveUserInput: $approveUserInput) {
            _id
            fullName
            approved
            role
            featured
        }
    }
`