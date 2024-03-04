import React, { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { NavLink, Navigate, Outlet } from "react-router-dom"
import "./styles/adminLayout.css"
import { IUserContext } from "../../utils/APIResponseTypes"
export default function AdminLayout() {
    const { adminMode } = useContext<IUserContext>(UserContext)

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
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                    to="."
                    end
                >
                    Alkunäkymä
                </NavLink>
                <NavLink
                    to="recipes"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Näytä kaikki reseptit
                </NavLink>
                <NavLink
                    to="users"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Näytä kaikki käyttäjät
                </NavLink>
                <NavLink
                    to="comments"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Näytä kaikki kommentit
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
