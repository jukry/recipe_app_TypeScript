import { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { IUserContext } from "../utils/APIResponseTypes"

export const useUpdateUser = () => {
    const { user, dispatch } = useContext<IUserContext>(UserContext)

    const updateUser = (newEmail: string) => {
        if (!dispatch) return null
        dispatch({ type: "UPDATEUSER", payload: { ...user, email: newEmail } })
    }
    return { updateUser }
}
