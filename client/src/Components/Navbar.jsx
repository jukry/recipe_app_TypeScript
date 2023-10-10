import { useContext, useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { UserContext } from "../Context/UserContext"

export default function Navbar(props) {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    const showNav = props.props[0]
    const showNavBar = props.props[1]
    return (
        <header className={!showNavBar ? "header-hidden" : ""}>
            <Link className="logo-container" to="/">
                <h1 className="logo">
                    My <span>Recipes</span>
                </h1>
            </Link>
            <nav className="nav-container">
                <section
                    className={`top-nav ${
                        showNav ? "top-nav-active" : "top-nav-disabled"
                    }`}
                >
                    <NavLink to="/">Reseptit</NavLink>
                    <NavLink to="account">Oma tili</NavLink>
                    {isLoggedIn ? (
                        <NavLink
                            to="/"
                            onClick={async () => {
                                setIsLoggedIn((prev) => !prev)
                                await fetch(
                                    process.env.NODE_ENV === "production"
                                        ? import.meta.env.VITE_LOGOUT_ENDPOINT
                                        : import.meta.env
                                              .VITE_LOGOUT_ENDPOINT_DEV,
                                    {
                                        method: "POST",
                                        credentials: "include",
                                    }
                                )
                                location.replace("/")
                            }}
                        >
                            Kirjaudu ulos
                        </NavLink>
                    ) : (
                        <NavLink to="login">Kirjaudu sisään</NavLink>
                    )}
                    {isLoggedIn ? (
                        ""
                    ) : (
                        <NavLink to="/register">Rekisteröidy</NavLink>
                    )}
                </section>
            </nav>

            <div
                onClick={(e) => props.handleNavClick(e)}
                className="nav-button"
            >
                <span
                    className={`${!showNav ? "line line-1" : "cross cross-1"}`}
                ></span>
                <span
                    className={`${!showNav ? "line line-2" : "cross cross-2"}`}
                ></span>
                <span
                    className={`${!showNav ? "line line-3" : "line-hidden"}`}
                ></span>
            </div>
        </header>
    )
}
