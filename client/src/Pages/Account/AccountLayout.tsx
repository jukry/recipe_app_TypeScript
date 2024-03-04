import React, { useContext } from "react"
import { NavLink, Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import { IUserContext } from "../../utils/APIResponseTypes"

export default function AccountLayout() {
    const { adminMode } = useContext<IUserContext>(UserContext)
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
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                    to="."
                    end
                >
                    Omat tiedot
                </NavLink>
                <NavLink
                    to="favoriterecipes"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Suosikkireseptit
                </NavLink>
                <NavLink
                    to="myrecipes"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Omat reseptit
                </NavLink>
                <NavLink
                    to="addnewrecipe"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Lisää uusi resepti
                </NavLink>
                <NavLink
                    to="usersettings"
                    style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }
                >
                    Käyttäjäasetukset
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
