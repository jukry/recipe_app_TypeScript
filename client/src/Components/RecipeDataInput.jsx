import React from "react"
import IngredientInput from "./IngredientInput"
import "../Pages/Account/styles/newRecipe.css"

export default function RecipeDataInput() {
    return (
        <section id="recipe-text-input">
            <IngredientInput
                type="text"
                placeholder="Anna reseptin nimi"
                className="new-recipe-name"
                name="name"
                required={true}
            />
            <IngredientInput
                type="text"
                placeholder="Anna reseptin kuvaus"
                className="new-recipe-description"
                name="description"
                required={true}
            />
        </section>
    )
}
