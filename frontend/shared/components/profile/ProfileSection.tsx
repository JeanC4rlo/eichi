"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { UserCircleIcon } from "@heroicons/react/16/solid"
import { ProfileMenu } from "@/shared/components/profile/ProfileMenu"

export const ProfileSection = (): React.ReactElement => {
    const { user, loading } = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    if (loading) {
        return <span className="font-heading">Carregando...</span>
    }

    return (
        <div ref={containerRef} className="relative">
            {user ? (
                <>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`
                            flex items-center gap-2 px-3 py-1 cursor-pointer transition-all
                            duration-300 w-full border-2 border-black relative z-10
                            ${isMenuOpen
                                ? "rounded-t-2xl bg-black text-white"
                                : "rounded-2xl bg-white hover:bg-black hover:text-white"}
                        `}
                    >
                        <UserCircleIcon className="h-[20px] w-[20px]" />
                        <span className="text-lg font-heading">
                            {user.username}
                        </span>
                    </button>

                    <div
                        className={`
                            absolute top-full left-0 w-full origin-top transition-translate
                            ease border-t-0 border-2 rounded-b-2xl overflow-hidden
                            ${isMenuOpen 
                                ? "opacity-100 pointer-events-auto duration-400 delay-200"
                                : "opacity-0 pointer-events-none duration-100 delay-0"}
                        `}
                    >
                        <ProfileMenu user={user} loading={loading} />
                    </div>
                </>
            ) : (
                <Link href="/login">
                    <div className="
                        flex items-center gap-2 px-3 py-1 border-2 border-black rounded-2xl
                        hover:text-white hover:bg-black transition-all duration-300
                    ">
                        <UserCircleIcon className="h-[20px] w-[20px]" />
                        <span className="text-lg font-heading">Entrar</span>
                    </div>
                </Link>
            )}
        </div>
    )
}
