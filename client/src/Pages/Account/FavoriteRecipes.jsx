import React from "react"
import "./styles/account.css"
import { getUserData } from "../../utils/utils"
import { redirect } from "react-router-dom"

export async function loader({ request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/login")
    }
    return null
}

export default function FavoriteRecipes() {
    return (
        <section className="favrecipes-container">
            <div>Suosikkireseptit</div>
        </section>
    )
}
