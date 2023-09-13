import { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { UserContext } from "../Context/UserContext"

export default function Navbar() {
    const [showNav, setShowNav] = useState(false)
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)

    return (
        <header>
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
                                    import.meta.env.VITE_LOGOUT_ENDPOINT,
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
                onClick={() => setShowNav((prev) => !prev)}
                className="nav-button"
            >
                <span
                    className={`${!showNav ? "line line-1" : "cross cross-1"}`}
                ></span>
                <span
                    className={`${!showNav ? "line line-2" : "cross cross-2"}`}
                ></span>
                <span
                    className={`${
                        !showNav ? "line line-3" : `style="display:none;"`
                    }`}
                ></span>
            </div>
        </header>
    )
}
