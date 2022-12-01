/*=============================================== ContactPages type ===============================================*/

export type ContactPagesType = {
    _id: string

    title: string
    body: string
    hideContact: boolean
    showForm: boolean

    labelName: string
    labelEmail: string
    labelSubject: string
    labelMessage: string
    labelButton: string

    header: boolean
    orderHeader: number
    footer: boolean
    orderFooter: number
}
