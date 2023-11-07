import React from "react"
import IngredientInputWrapper from "./IngredientInputWrapper"
import RecipeStepsInput from "./RecipeStepsInput"
import RecipeDataInput from "./RecipeDataInput"
import "../Pages/Account/styles/newRecipe.css"
import RecipeImageInput from "./RecipeImageInput"

export default function RecipeDataContainer({ props }) {
    return (
        <div id="recipe-data-container">
            <RecipeDataInput props={props} />
            <div id="recipe-ingredient-steps-wrapper">
                <IngredientInputWrapper props={props} />
                <RecipeStepsInput props={props} />
                <RecipeImageInput props={props} />
            </div>
        </div>
    )
}
