"use client"

import { useAuth } from "@/contexts/AuthContext"
import { LoginForm } from "@/shared/components/forms/LoginForm"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Login() {
    const { loading, user } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    
    useEffect(() => {
        if(!loading && user) {
            router.replace(searchParams.get("redirect") || "/")
        }
    }, [loading, user, router, searchParams])

    if (loading) return <div>Carregando...</div>
    if (user) return null

    return (
        <div className="flex w-full min-h-0 h-full overflow-hidden">
            <div className="w-1/2 h-full hidden md:block relative">
                <img 
                    src="/hero.jpg" 
                    alt="Hero Image" 
                    className="object-cover w-full h-[calc(100vh-72px)]" 
                />
            </div>
            <div className="flex flex-col flex-1 items-center justify-center p-8 overflow-y-auto">
                <div className="w-full max-w-sm">
                    <h2 className="font-heading font-bold text-4xl mb-6 text-center">
                        Seja bem-vindo(a)!
                    </h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
