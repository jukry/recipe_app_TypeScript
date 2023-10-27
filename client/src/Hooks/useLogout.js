import { useContext } from "react"
import { UserContext } from "../Context/UserContext"

export const useLogout = () => {
    const { dispatch, setIsLoggedIn } = useContext(UserContext)

    const logout = async () => {
        const res = await fetch(
            process.env.NODE_ENV === "production"
                ? import.meta.env.VITE_LOGOUT_ENDPOINT
                : import.meta.env.VITE_LOGOUT_ENDPOINT_DEV,
            {
                method: "POST",
                credentials: "include",
            }
        )
        if (res.ok) {
            dispatch({ type: "LOGOUT" })
            setIsLoggedIn(false)
        }
    }
    return { logout }
}
