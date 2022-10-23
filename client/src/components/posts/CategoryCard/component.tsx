/*=============================================== CategoryCard component ===============================================*/

import React from "react"
import { Text } from "tsx-library-julseb"
import { slugify, unslugify } from "../../../utils"

import * as Styles from "./styles"
import { CategoryCardProps } from "./types"

const CategoryCard = ({ category: { name, posts } }: CategoryCardProps) => {
    return (
        <Styles.StyledCategoryCard to={`/categories/${slugify(name)}`}>
            <Text tag="h6">{unslugify(name)}</Text>
            <Text tag="small" color="gray">
                {posts?.length} posts
            </Text>
        </Styles.StyledCategoryCard>
    )
}

export default CategoryCard
