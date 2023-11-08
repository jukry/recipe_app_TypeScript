import { NavLink, Link } from "react-router-dom"
import ShowMobileNavButton from "./ShowMobileNavButton"
import { useLogout } from "../Hooks/useLogout"
import { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { RecipesShownContext } from "../Context/RecipesShownContext"

export default function Navbar(props) {
    const { isLoggedIn, user, adminMode, setAdminMode } =
        useContext(UserContext)
    const { setCurrentRecipe } = useContext(RecipesShownContext)
    const showNav = props.props[0]
    const showNavBar = props.props[1]
    const { logout } = useLogout()
    //TODO create a nav for mobile only?
    return (
        <header className={!showNavBar ? "header-hidden" : "header-show"}>
            <nav className="nav-container">
                <Link
                    className="logo-container"
                    to="/"
                    onClick={() => setCurrentRecipe(null)}
                    tabIndex={0}
                >
                    <span className="logo">
                        My <span>Recipes</span>
                    </span>
                </Link>
                <nav
                    className={`top-nav ${
                        showNav ? "top-nav-active" : "top-nav-disabled"
                    }`}
                >
                    <NavLink to="/">Reseptit</NavLink>
                    {user.role === "Admin" && adminMode ? (
                        <NavLink to="admin">Hallintapaneeli</NavLink>
                    ) : (
                        <NavLink to="account">Oma tili</NavLink>
                    )}

                    {!isLoggedIn ? (
                        <NavLink to="login">Kirjaudu sisään</NavLink>
                    ) : (
                        <NavLink to="/" onClick={async () => await logout()}>
                            Kirjaudu ulos
                        </NavLink>
                    )}
                    {!isLoggedIn ? (
                        <NavLink to="/register">Rekisteröidy</NavLink>
                    ) : (
                        ""
                    )}
                </nav>
                {user.role === "Admin" && (
                    <div id="role-switch-container">
                        <p>Käyttäjä: {adminMode ? "Admin" : "Käyttäjä"}</p>
                        <label htmlFor="role-switch" id="role-switch-wrapper">
                            <input
                                type="checkbox"
                                id="role-switch"
                                aria-label={`Vaihda käyttäjäroolia, valittuna ${
                                    adminMode ? "admin" : "käyttäjä"
                                }`}
                                tabIndex={2}
                                value={adminMode}
                                checked={adminMode}
                                onChange={() => {
                                    setAdminMode((prev) => !prev)
                                }}
                            />
                            <span id="slider-round"></span>
                        </label>
                    </div>
                )}
            </nav>
            <ShowMobileNavButton
                showNav={showNav}
                handleNavClick={props.handleNavClick}
            />
        </header>
    )
}
