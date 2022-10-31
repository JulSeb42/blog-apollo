/*=============================================== Page query ===============================================*/

import { PageType } from "../../../../types"

export const PageQuery = {
    pages: async (_: any, { filters }: any, { pages }: any) => {
        let sortedPages: PageType[] = await pages()

        sortedPages = sortedPages.sort((a: any, b: any) =>
            a.title < b.title ? -1 : 0
        )

        if (filters) {
            const { header, footer, draft } = filters

            if (header) {
                sortedPages = sortedPages.filter(
                    (page: any) => page.header === true
                )

                sortedPages = sortedPages.sort((a, b) =>
                    a.orderHeader < b.orderHeader ? -1 : 0
                )
            }

            if (footer) {
                sortedPages = sortedPages.filter(page => page.footer === true)

                sortedPages = sortedPages.sort((a, b) =>
                    a.orderFooter < b.orderFooter ? -1 : 0
                )
            }

            if (draft === false) {
                sortedPages = sortedPages.filter(page => page.draft === false)
            }
        }

        return sortedPages
    },
    page: async (_: any, { slug }: any, { page }: any) => await page({ slug }),
    pageById: async (_: any, { _id }: any, { pageById }: any) =>
        await pageById({ _id }),
}
