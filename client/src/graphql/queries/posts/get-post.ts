/*=============================================== Get post ===============================================*/

import { gql } from "@apollo/client"

export const GET_POST = gql`
    query ($slug: String!) {
        post(slug: $slug) {
            _id
            title
            imageUrl
            body
            slug
            draft
            author {
                fullName
                imageUrl
                bio
            }
            category {
                name
            }
            comments {
                _id
                body
                poster
                date
                time
            }
        }
    }
`
