/*=============================================== RedirectCategory ===============================================*/

import React from "react"
import { useParams, Navigate } from "react-router-dom"

const RedirectCategory = () => {
    const { category } = useParams()

    return <Navigate to={`/categories/${category}`} />
}

export default RedirectCategory
