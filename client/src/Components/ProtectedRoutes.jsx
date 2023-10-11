import React, { Suspense, useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { Navigate, Outlet } from "react-router-dom"
import Loader from "./Loader"

export default function ProtectedRoutes() {
    const { user } = useContext(UserContext)
    return (
        <Suspense fallback={<Loader />}>
            {user.id ? <Outlet /> : <Navigate to="/login" />}
        </Suspense>
    )
}
