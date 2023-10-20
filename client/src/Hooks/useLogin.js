import { useContext } from "react"
import { UserContext } from "../Context/UserContext"

export const useLogin = () => {
    const { dispatch, setIsLoggedIn, setIsLoading } = useContext(UserContext)
    const login = async (email, password) => {
        setIsLoading(true)
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
            setIsLoading(false)
            setIsLoggedIn(true)
            return res
        }
    }
    return { login }
}
