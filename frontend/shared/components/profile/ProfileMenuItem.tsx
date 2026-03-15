import ProfileMenuItemData from "@/shared/components/profile/profileMenuItemData"
import Link from "next/link"

interface ProfileMenuItemProps {
    data: ProfileMenuItemData
}

export const ProfileMenuItem = ({ data }: ProfileMenuItemProps): React.ReactElement => {
    return (
        <Link href={data.href} className="
            inline-block w-full h-full bg-white hover:bg-gray-200 text-center text-lg
            font-heading">
            {data.label}
        </Link>
    )
}