import {
    ReactElement,
    createContext,
    useEffect,
    useReducer,
    useState,
} from "react"
import { DispatchActions, IUserContext, User } from "../utils/APIResponseTypes"

export const UserContext = createContext({})

export const userReducer = (
    state: IUserContext,
    action: DispatchActions
): IUserContext => {
    switch (action.type) {
        case "UPDATEFAV":
            return { user: action?.payload as User }
        case "DELETERECIPE":
            return { user: action.payload as User }
        case "LOGIN":
            return { user: action.payload as User }
        case "LOGOUT":
            return { user: {}, isLoggedIn: false }
        case "UPDATEUSER":
            return { user: action.payload as User }
        default:
            return state
    }
}

const initialState: IUserContext = {
    user: {},
    isLoggedIn: false,
    isLoading: false,
}

export const UserContextProvider = ({
    children,
}: {
    children: ReactElement
}) => {
    const [state, dispatch] = useReducer(userReducer, initialState)
    const [isLoading, setIsLoading] = useState(false)
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
        window.localStorage.setItem("amode", adminMode.toString())
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
