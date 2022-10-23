/*=============================================== Get user ===============================================*/

import { gql } from "@apollo/client"

export const GET_USER = gql`
    query ($fullName: String!) {
        user(fullName: $fullName) {
            fullName
            bio
            imageUrl
            posts {
                _id
                category {
                    name
                }
                date
                title
                imageUrl
                body
                slug
                metaDescription
            }
        }
    }
`
