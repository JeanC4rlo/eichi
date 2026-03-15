export default interface ProfileMenuItemData {
    label: string,
    href: string
}

export const unauthenticatedMenuItemData: ProfileMenuItemData[] = []

export const authenticatedMenuItemsData: ProfileMenuItemData[] = [
    { label: "Sair", href: "/logout" }
]
