/*=============================================== Page type ===============================================*/

export type PageType = {
    title: string
    slug: string
    body: string
    metaDescription: string
    keywords: string[] | string
    draft: boolean
    header: boolean
    orderHeader: number
    footer: boolean
    orderFooter: number
}
