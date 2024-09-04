import { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { IUserContext } from "../utils/APIResponseTypes"

export const useLogin = () => {
    const { dispatch, setIsLoggedIn } = useContext<IUserContext>(UserContext)
    const login = async (email: string, password: string) => {
        if (!setIsLoggedIn || !dispatch) return null
        dispatch({ type: "LOADING", payload: true })
        const res = await fetch(
            process.env.NODE_ENV === "production"
                ? import.meta.env.VITE_AUTH_ENDPOINT
                : import.meta.env.VITE_AUTH_ENDPOINT_DEV,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        )
        if (!res.ok) {
            return res
        }
        if (res.ok) {
            const user = await res.json()

            const userDataResponse = await fetch(
                process.env.NODE_ENV === "production"
                    ? import.meta.env.VITE_USERDATA_ENDPOINT
                    : import.meta.env.VITE_USERDATA_ENDPOINT_DEV,
                {
                    method: "get",
                    credentials: "include",
                }
            )
            const userData = await userDataResponse.json()
            dispatch({ type: "LOGIN", payload: userData })
            dispatch({ type: "LOADING", payload: false })
            setIsLoggedIn(true)
            return res
        }
    }
    return { login }
}
