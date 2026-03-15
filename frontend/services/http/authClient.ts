import axios from "axios"
import { getCookie } from "@/lib/cookies"

const refreshEndpoint = "/auth/refresh"

export const authClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

authClient.interceptors.request.use((config) => {
    const isRefreshRequest = config.url?.includes(refreshEndpoint)
    const csrfToken = getCookie(
        isRefreshRequest ? "csrf_refresh_token" : "csrf_access_token"
    )

    if(csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken
    }

    return config
})

authClient.interceptors.response.use(response => response,
    async(error) => {
        const originalRequest = error.config
        const isRefreshRequest = originalRequest?.url?.includes(refreshEndpoint)

        if(
            error.response?.status === 401 &&
            !originalRequest?._retry &&
            !isRefreshRequest
        ) {
            originalRequest._retry = true
            await authClient.post(refreshEndpoint)
            return authClient(originalRequest)
        }

        return Promise.reject(error)
    }
)
