/*=============================================== Page type ===============================================*/

export type PageType = {
    _id: string
    title: string
    slug: string
    body: string
    metaDescription: string
    keywords: string
    draft: boolean
    header: boolean
    orderHeader: number
    footer: boolean
    orderFooter: number
}
