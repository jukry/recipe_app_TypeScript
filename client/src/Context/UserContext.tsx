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
        case "LOADING": {
            return { ...state, isLoading: action.payload as boolean }
        }
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
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [adminMode, setAdminMode] = useState(
        window.localStorage.getItem("amode") === "true" || false
    )
    useEffect(() => {
        dispatch({ type: "LOADING", payload: true })
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
                dispatch({ type: "LOADING", payload: false })
                dispatch({ type: "LOGIN", payload: userData })
            }
            dispatch({ type: "LOADING", payload: false })
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
