import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        async function getUserData() {
            const data = await fetch(
                process.env.NODE_ENV === "production"
                    ? import.meta.env.VITE_USERDATA_ENDPOINT
                    : import.meta.env.VITE_USERDATA_ENDPOINT_DEV,
                {
                    method: "get",
                    credentials: "include",
                }
            )
            const body = await data.json()
            setUser(body)
            setIsLoading(false)
        }
        if (!user.id) {
            getUserData()
        }
    }, [])

    if (user.id && !isLoggedIn) {
        setIsLoggedIn((prev) => !prev)
    }

    return (
        <UserContext.Provider
            value={{ user, setUser, isLoggedIn, setIsLoggedIn, isLoading }}
        >
            {children}
        </UserContext.Provider>
    )
}
