import React, { useContext } from "react"
import { NavLink, Navigate, Outlet, redirect } from "react-router-dom"
import { AuthContext } from "../../Components/AuthContext"
import { getUserData } from "../../utils/utils"

export async function loader({ request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/login")
    }
    return null
}

export default function AccountLayout() {
    const { user } = useContext(AuthContext)

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "hsl(35, 69%, 88%)",
    }
    return !user.id ? (
        <section className="account-container">
            <h3 className="account-loading">Haetaan tietoja...</h3>
        </section>
    ) : (
        <section className="account-container">
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
            </nav>
            <h3>Welcome back, {user.email}</h3>
            <Outlet />
        </section>
    )
}
