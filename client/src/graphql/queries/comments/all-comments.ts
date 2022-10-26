/*=============================================== All comments ===============================================*/

import { gql } from "@apollo/client"

export const ALL_COMMENTS = gql`
    query {
        comments {
            _id
            body
            post {
                title
                slug
                category {
                    name
                }
            }
            poster
            date
            time
        }
    }
`
