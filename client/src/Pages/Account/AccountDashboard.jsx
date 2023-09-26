import React, { useContext } from "react"
import "./styles/account.css"
import { redirect, useLoaderData } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import { getUserData } from "../../utils/utils"

export async function loader({ request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/login")
    }
    return res
}

export default function AccountDashboard() {
    const loaderData = useLoaderData()
    const { user } = useContext(UserContext)
    document.title = "Omat tiedot"

    return (
        <section id="account-details">
            <h3 id="username">Tervetuloa {user.email.split("@")[0]}</h3>
            {user.lastlogins.length === 2 ? (
                <p id="lastlogin">
                    Edellinen kirjautuminen:{" "}
                    {new Date(user.lastlogins[0]).toLocaleString("fi-FI")}
                </p>
            ) : (
                ""
            )}
            <p id="recipesamount">
                Sinulla on {loaderData.recipes.length}
                {loaderData.recipes.length === 1
                    ? " oma resepti"
                    : " omaa reseptiä"}
            </p>
            <p id="favrecipeamount">
                Sinulla on {loaderData.favrecipes.length}
                {loaderData.favrecipes.length === 1
                    ? " suosikkiresepti"
                    : " suosikkireseptiä"}
            </p>
        </section>
    )
}
