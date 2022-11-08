/*=============================================== Global types ===============================================*/

export type GlobalType = {
    _id: string
    name: string
    baseline: string
    metaDescription?: string
    favicon?: string
    email?: string
    cover?: string
    keywords?: string[] | string
    language?: string
    isGlobalSetup: boolean
}
