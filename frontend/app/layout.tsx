import "./globals.css"
import { funnel, inter, fira } from "@/app/fonts"
import { AuthProvider } from "@/contexts/AuthContext"
import Header from "@/shared/components/layout/Header/Header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br">
            <body className={`${funnel.variable} ${inter.variable} ${fira.variable} box-border`}>
                <AuthProvider>
                    <div className="grid grid-rows-[auto_1fr] min-h-screen">
                        <Header />
                        {children}
                    </div>
                </AuthProvider>
            </body>
        </html>
    )
}
