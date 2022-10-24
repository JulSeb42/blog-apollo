/*=============================================== Update category ===============================================*/

import { gql } from "@apollo/client"

export const UPDATE_CATEGORY = gql`
    mutation ($updateCategoryInput: UpdateCategoryInput) {
        updateCategory(updateCategoryInput: $updateCategoryInput) {
            _id
            name
        }
    }
`
