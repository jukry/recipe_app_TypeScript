import React from "react"
import "./styles/account.css"
import { requireAuth } from "../../utils/utils"

export async function loader(request) {
    await requireAuth(request)
    return null
}

export default function FavoriteRecipes() {
    return (
        <section className="favrecipes-container">
            <div>Suosikkireseptit</div>
        </section>
    )
}
