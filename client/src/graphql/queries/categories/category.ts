/*=============================================== Category ===============================================*/

import { gql } from "@apollo/client"

export const CATEGORY = gql`
    query ($name: String!) {
        category(name: $name) {
            _id
            name
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
