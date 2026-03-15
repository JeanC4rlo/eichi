"use client"

import User from "@/contexts/AuthContext"
import { ProfileMenuItem } from "@/shared/components/profile/ProfileMenuItem"
import ProfileMenuItemData, { authenticatedMenuItemsData } from "@/shared/components/profile/profileMenuItemData"

interface ProfileMenuProps {
    user: User,
    loading: boolean
}

export const ProfileMenu = ({ user, loading }: ProfileMenuProps): React.ReactElement => {
    return (
        <>
            {user && !loading && authenticatedMenuItemsData.map((data: ProfileMenuItemData) => (
                <ProfileMenuItem key={data.label} data={data} />
            ))}
        </>
    )
}