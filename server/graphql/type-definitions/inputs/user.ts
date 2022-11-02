/*=============================================== User inputs ===============================================*/

import { gql } from "apollo-server"

export const UserInputs = gql`
    input AddUserInput {
        fullName: String!
        email: String!
        role: UserRoles!
    }

    input EditUserInput {
        _id: ID!
        fullName: String
        bio: String
        imageUrl: String
    }

    input EditPasswordInput {
        _id: ID!
        oldPassword: String!
        newPassword: String!
    }

    input EditRoleInput {
        _id: ID!
        role: UserRoles!
    }

    input FilterUsersInput {
        featured: Boolean
        role: UserRoles
        approved: Boolean
        hasPosts: Boolean
    }

    input SetUserRoleInput {
        _id: ID!
        role: UserRoles!
    }

    input FeatureUserInput {
        _id: ID!
        featured: Boolean
    }

    input ApproveUserInput {
        _id: ID!
        approved: Boolean
    }
`
