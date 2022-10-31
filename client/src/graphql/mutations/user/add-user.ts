/*=============================================== Add user ===============================================*/

import { gql } from "@apollo/client"

export const ADD_USER = gql`
    mutation ($addUserInput: AddUserInput) {
        addUser(addUserInput: $addUserInput) {
            _id
            fullName
            approved
            role
            featured
        }
    }
`
