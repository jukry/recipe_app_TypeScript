import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function AccountLayout() {
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "hsl(35, 69%, 88%)",
    }
    return (
        <>
            <section className="account-container">
                <nav className="account-nav">
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        to="."
                        end
                    >
                        Omat tiedot
                    </NavLink>
                    <NavLink
                        to="favoriterecipes"
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                    >
                        Suosikkireseptit
                    </NavLink>
                </nav>
                <Outlet />
            </section>
        </>
    )
}
