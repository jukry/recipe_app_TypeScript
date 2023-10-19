import React, { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "./Loader"

export default function ProtectedRoutes() {
    const context = useContext(UserContext)
    console.log(context)
    return context.isLoading ? (
        <Loader />
    ) : context.user.id ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    )
}
