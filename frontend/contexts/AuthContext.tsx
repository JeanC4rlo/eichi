"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { authClient } from "../services/http/authClient"

export default interface User {
    id: string,
    username: string,
    email: string
}

interface AuthContextType {
    user: User | null,
    loading: boolean,
    login: (identifier: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await authClient.get("/user/me")
                setUser(res.data)
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    const login = async (identifier: string, password: string) => {
        try {
            await authClient.post("/auth/login", { identifier, password })
            const res = await authClient.get("/user/me")
            setUser(res.data)
        } catch (err) {
            setUser(null)
            throw err
        }
    }

    const logout = async () => {
        try {
            await authClient.post("/auth/logout")
            setUser(null)
        } catch(err) {
            throw err
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    
    if (!context) 
        throw new Error("useAuth deve ser usado dentro de AuthProvider")
    
    return context
}
