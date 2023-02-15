export default function Navbar() {
    return (
        <header>
            <div className="logo-container">
                <h1 className="logo">
                    My <span>Recipes</span>
                </h1>
            </div>
            <nav className="top-nav">
                <ul>
                    <li>
                        <a href="#">Reseptit</a>
                    </li>
                    <li>
                        <a href="#">Kirjaudu</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
