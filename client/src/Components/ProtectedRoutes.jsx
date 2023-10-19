import React, { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "./Loader"

function ProtectedRoutes() {
    const context = useContext(UserContext)
    return context.isLoading ? (
        <Loader text={"Ladataan sisältöä"} />
    ) : context.user.id ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    )
}

export default ProtectedRoutes
