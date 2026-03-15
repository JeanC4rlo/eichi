export default interface NavItemData {
    label: string,
    href: string,
    auth: boolean
}

export const navItemsData: NavItemData[] = [
    { label: "Home", href: "/", auth: false }
]
