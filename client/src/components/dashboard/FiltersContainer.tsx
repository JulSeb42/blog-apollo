/*=============================================== FiltersContainer ===============================================*/

import styled from "styled-components/macro"
import { Flexbox } from "tsx-library-julseb"

const FiltersContainer = styled(Flexbox)`
    & > div {
        flex-grow: 1;
    }
`

export default FiltersContainer