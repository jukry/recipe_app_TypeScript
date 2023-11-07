import React, { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { NavLink, Navigate, Outlet } from "react-router-dom"
import "./styles/adminLayout.css"
export default function AdminLayout() {
    const { adminMode } = useContext(UserContext)

    if (!adminMode) {
        return <Navigate to="/account" />
    }
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
    }
    return (
        <div id="admin-layout-container">
            <nav id="admin-nav">
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to="."
                    end
                >
                    Alkunäkymä
                </NavLink>
                <NavLink
                    to="recipes"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Näytä kaikki reseptit
                </NavLink>
                <NavLink
                    to="users"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Näytä kaikki käyttäjät
                </NavLink>
                <NavLink
                    to="comments"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Näytä kaikki kommentit
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
