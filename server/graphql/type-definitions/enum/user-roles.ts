/*=============================================== User roles enum ===============================================*/

import { gql } from "apollo-server"

export const EnumRoles = gql`
    enum UserRoles {
        admin
        writer
        moderator
    }
`
