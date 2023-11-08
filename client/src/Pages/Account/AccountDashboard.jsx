import React, { useContext } from "react"
import "./styles/account.css"
import { UserContext } from "../../Context/UserContext"

export default function AccountDashboard() {
    const { user } = useContext(UserContext)
    document.title = "Omat tiedot"

    return (
        <section id="account-details">
            <h3 id="username" tabIndex={0}>
                Tervetuloa {user.email}
            </h3>
            {user.lastlogins.length === 2 ? (
                <p id="lastlogin" tabIndex={0}>
                    Edellinen kirjautuminen:{" "}
                    {new Date(user.lastlogins[0]).toLocaleString("fi-FI")}
                </p>
            ) : (
                ""
            )}
            <p id="recipesamount" tabIndex={0}>
                Sinulla on {user.recipes.length}
                {user.recipes.length === 1 ? " oma resepti" : " omaa reseptiä"}
            </p>
            <p id="favrecipeamount" tabIndex={0}>
                Sinulla on {user.favrecipes.length}
                {user.favrecipes.length === 1
                    ? " suosikkiresepti"
                    : " suosikkireseptiä"}
            </p>
        </section>
    )
}
