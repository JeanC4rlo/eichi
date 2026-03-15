"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import NavItemData from "@/shared/components/navigation/navItemData"
import clsx from "clsx"

interface NavItemProps {
    data: NavItemData
}

export const NavItem = ({ data }: NavItemProps): React.ReactElement => {

    const pathname = usePathname()
    const isActive = pathname === data.href

    return (
        <Link href={data.href}>
            <span
                className={clsx(
                    `text-lg font-heading relative inline-block before:content-['']
                    before:absolute before:left-0 before:bottom-[-1px] before:w-full
                    before:h-[2px] before:bg-primary before:origin-center before:transition-transform
                    before:duration-400 hover:before:scale-x-100`,
                    {
                        "font-bold before:scale-x-50": isActive,
                        "before:scale-x-0": !isActive,
                    }
                )}
            >
                {data.label}
            </span>
        </Link>
    )
}