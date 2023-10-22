import { useContext } from "react"
import { UserContext } from "../Context/UserContext"

export const useUpdateUser = () => {
    const { user, dispatch } = useContext(UserContext)

    const updateUser = (newEmail) => {
        dispatch({ type: "UPDATEUSER", payload: { ...user, email: newEmail } })
    }
    return { updateUser }
}
