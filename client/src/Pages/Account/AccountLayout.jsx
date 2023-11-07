import React, { useContext } from "react"
import { NavLink, Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"

export default function AccountLayout() {
    const { adminMode } = useContext(UserContext)
    if (adminMode) {
        return <Navigate to="/admin" />
    }
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
    }
    return (
        <div className="account-container">
            <nav className="account-nav">
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to="."
                    end
                >
                    Omat tiedot
                </NavLink>
                <NavLink
                    to="favoriterecipes"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Suosikkireseptit
                </NavLink>
                <NavLink
                    to="myrecipes"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Omat reseptit
                </NavLink>
                <NavLink
                    to="addnewrecipe"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Lisää uusi resepti
                </NavLink>
                <NavLink
                    to="usersettings"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Käyttäjäasetukset
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
