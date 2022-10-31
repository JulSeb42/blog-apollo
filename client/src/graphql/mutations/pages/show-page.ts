/*=============================================== Show page ===============================================*/

import { gql } from "@apollo/client"

export const SHOW_PAGE = gql`
    mutation ($showPageInput: ShowPageInput) {
        showPage(showPageInput: $showPageInput) {
            _id
            header
            orderHeader
            footer
            orderFooter
            title
        }
    }
`
