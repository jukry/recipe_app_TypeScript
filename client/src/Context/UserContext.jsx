import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        async function getUserData() {
            const data = await fetch("http://localhost:5000/users/user", {
                method: "get",
                credentials: "include",
            })
            const body = await data.json()
            setUser(body)
        }
        if (!user.id) {
            getUserData()
        }
    }, [])

    if (user.id && !isLoggedIn) {
        setIsLoggedIn((prev) => !prev)
    }
    return (
        <UserContext.Provider value={{ user, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}
