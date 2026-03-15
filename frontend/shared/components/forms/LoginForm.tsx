"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import { useRouter, useSearchParams } from "next/navigation"
import UserCircleIcon from "@heroicons/react/16/solid/UserCircleIcon"
import KeyIcon from "@heroicons/react/16/solid/KeyIcon"
import { InputWithIcon } from "@/shared/components/ui/InputWithIcon"

export const LoginForm = (): React.ReactElement => {
    const { login } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
 
    const [error, setError] = useState<string | null>(null)

    const [identifier, setIdentifier] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    
    const submitLogin = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        event.preventDefault()

        setError(null)

        if (typeof identifier !== "string" || typeof password !== "string") {
            setError("Os tipos enviados não correspondem aos dados")
            return
        }

        try {
            await login(identifier, password)

            const redirect = searchParams.get("redirect") || "/"
            router.push(redirect)

        } catch {
            setError("Email ou senha inválidos.")
        }
    }

    return (
        <form onSubmit={submitLogin} className="flex flex-col gap-6">
            <section className="flex flex-col gap-1">
                <InputWithIcon 
                    label="Usuário ou email"
                    Icon={UserCircleIcon}
                    type="text"
                    name="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                />
            </section>
            <section className="flex flex-col gap-1">
                <InputWithIcon 
                    label="Senha"
                    Icon={KeyIcon}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </section>
            {error && (
                <p className="flex text-[red] font-body mt-1 mb-1">
                    <ExclamationCircleIcon className="w-6 h-6" /><span>{error}</span>
                </p>
            )}
            <button type="submit" className="
                w-full bg-[#8159ec] text-white font-body font-bold rounded-full py-2 mt-8
                border-2 border-[#8159ec] cursor-pointer hover:bg-white hover:text-[#8159ec] 
                transition-all duration-300
            ">
                Entrar
            </button>
        </form>
    )
}
