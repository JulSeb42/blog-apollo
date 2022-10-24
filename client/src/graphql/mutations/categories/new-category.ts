/*=============================================== New category ===============================================*/

import { gql } from "@apollo/client"

export const NEW_CATEGORY = gql`
    mutation ($newCategoryInput: NewCategoryInput) {
        newCategory(newCategoryInput: $newCategoryInput) {
            _id
            name
        }
    }
`
