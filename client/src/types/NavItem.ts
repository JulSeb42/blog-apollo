/*=============================================== Nav item types ===============================================*/

interface NavItem {
    text: string
    end?: boolean
    order?: number
}

interface PossibleItem1 extends NavItem {
    to: string
    onClick?: never
}

interface PossibleItem2 extends NavItem {
    to?: never
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type NavItemType = PossibleItem1 | PossibleItem2
