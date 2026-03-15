"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Logout() {
    const { logout, loading } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const doLogout = async () => {
            await logout()
            router.replace(searchParams.get("redirect") || "/")
        }

        if(!loading) {
            doLogout()
        }
    }, [loading, logout, router])

    if(loading) {
        return (
            <div>
                Carregando...
            </div>
        )
    }

    return (
        <div>
            Saindo...
        </div>
    )
}
