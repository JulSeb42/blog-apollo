/*=============================================== Feature user ===============================================*/

import { gql } from "@apollo/client"

export const FEATURE_USER = gql`
    mutation ($featureUserInput: FeatureUserInput) {
        featureUser(featureUserInput: $featureUserInput) {
            _id
            fullName
            approved
            role
            featured
        }
    }
`
