/*=============================================== NavigationLine types ===============================================*/

import { PageType, ContactPagesType } from "../../../types"

interface Possible1 {
    page: PageType
    contact?: never
}

interface Possible2 {
    page?: never
    contact: ContactPagesType
}

export type NavigationLineProps = Possible1 | Possible2
