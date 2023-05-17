import React, { useContext } from "react"
import { NavLink, Navigate, Outlet, redirect } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import { getUserData } from "../../utils/utils"

export async function loader({ request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/login")
    }
    return null
}

export default function AccountLayout() {
    const { user } = useContext(UserContext)

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
                <NavLink
                    to="myrecipes"
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                >
                    Omat reseptit
                </NavLink>
            </nav>
            <Outlet />
        </section>
    )
}
