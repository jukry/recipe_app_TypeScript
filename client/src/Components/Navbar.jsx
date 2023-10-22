import { NavLink, Link } from "react-router-dom"
import ShowMobileNavButton from "./ShowMobileNavButton"
import { useLogout } from "../Hooks/useLogout"
import { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { RecipesShownContext } from "../Context/RecipesShownContext"

export default function Navbar(props) {
    const { isLoggedIn } = useContext(UserContext)
    const { setCurrentRecipe } = useContext(RecipesShownContext)
    const showNav = props.props[0]
    const showNavBar = props.props[1]
    const { logout } = useLogout()

    return (
        <header className={!showNavBar ? "header-hidden" : "header-show"}>
            <Link
                className="logo-container"
                to="/"
                onClick={() => setCurrentRecipe(null)}
            >
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
                </section>
            </nav>
            <ShowMobileNavButton
                showNav={showNav}
                handleNavClick={props.handleNavClick}
            />
        </header>
    )
}
