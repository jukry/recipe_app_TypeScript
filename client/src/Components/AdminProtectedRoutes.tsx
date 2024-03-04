import React, { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "./Loader"
import { IUserContext } from "../utils/APIResponseTypes"

function AdminProtectedRoutes() {
    const context = useContext<IUserContext>(UserContext)
    return context.isLoading ? (
        <Loader text={"Ladataan sisältöä"} />
    ) : context?.user?.id && context?.user?.role === "Admin" ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    )
}

export default AdminProtectedRoutes
