import { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { IUserContext } from "../utils/APIResponseTypes"

interface ILogoutHook {
    logout: () => Promise<Response>
}

export const useLogout = (): ILogoutHook | null => {
    const { dispatch, setIsLoggedIn, setAdminMode } =
        useContext<IUserContext>(UserContext)
    if (!setIsLoggedIn || !setAdminMode || !dispatch) return null
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
            setAdminMode(false)
        }
        return res
    }
    return { logout }
}
