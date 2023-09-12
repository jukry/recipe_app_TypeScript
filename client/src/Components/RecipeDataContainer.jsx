import React from "react"
import IngredientInputWrapper from "./IngredientInputWrapper"
import RecipeStepsInput from "./RecipeStepsInput"
import RecipeDataInput from "./RecipeDataInput"
import "../Pages/Account/styles/newRecipe.css"

export default function RecipeDataContainer() {
    return (
        <section id="recipe-data-container">
            <RecipeDataInput />
            <section id="recipe-ingredient-steps-wrapper">
                <IngredientInputWrapper />
                <RecipeStepsInput />
            </section>
        </section>
    )
}
