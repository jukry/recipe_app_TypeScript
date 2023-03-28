import { NavLink, Link } from "react-router-dom"
export default function Navbar() {
    return (
        <header>
            <Link className="logo-container" to="/">
                <h1 className="logo">
                    My <span>Recipes</span>
                </h1>
            </Link>
            <nav className="top-nav">
                <NavLink to="recipes">Reseptit</NavLink>
                <NavLink to="login">Kirjaudu</NavLink>
            </nav>
        </header>
    )
}
