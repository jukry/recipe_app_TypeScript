import { createContext, useEffect, useReducer, useState } from "react"

export const UserContext = createContext()

export const userReducer = (state, action) => {
    switch (action.type) {
        case "UPDATEFAV":
            return { user: action.payload[0] }
        case "DELETERECIPE":
            return { user: action.payload[0] }
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: {} }
        case "UPDATEUSER":
            return { user: action.payload }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        user: {},
    })
    const [isLoading, setIsLoading] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [adminMode, setAdminMode] = useState(
        window.localStorage.getItem("amode") === "true" || false
    )
    useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const res = await fetch(
                process.env.NODE_ENV === "production"
                    ? import.meta.env.VITE_USERDATA_ENDPOINT
                    : import.meta.env.VITE_USERDATA_ENDPOINT_DEV,
                {
                    method: "get",
                    credentials: "include",
                }
            )
            const userData = await res.json()
            if (userData.id) {
                setIsLoggedIn(true)
                setIsLoading(false)
                dispatch({ type: "LOGIN", payload: userData })
            }
            setIsLoading(false)
        }
        getUserData()
    }, [])

    useEffect(() => {
        window.localStorage.setItem("amode", adminMode)
    }, [adminMode])

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                isLoading,
                setIsLoading,
                ...state,
                dispatch,
                adminMode,
                setAdminMode,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
