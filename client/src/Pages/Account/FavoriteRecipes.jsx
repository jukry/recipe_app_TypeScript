import React from "react"
import "./styles/account.css"

export async function loader(request) {
    return null
}

export default function FavoriteRecipes() {
    return (
        <section className="favrecipes-container">
            <div>Suosikkireseptit</div>
        </section>
    )
}
