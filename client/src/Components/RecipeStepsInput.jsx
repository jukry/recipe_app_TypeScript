import React from "react"
import { addRow } from "../utils/utils"
import "../Pages/Account/styles/newRecipe.css"

export default function RecipeStepsInput() {
    return (
        <fieldset id="recipe-steps">
            <legend>Anna reseptin valmistusohje</legend>
            <button type="button" id="button-add-step" onClick={addRow}>
                Lisää vaihe
            </button>
            <input
                type="text"
                placeholder="Kirjoita vaihe"
                className="new-recipe-step"
                id="step-1"
                name="step1"
                required={true}
            />
            <input
                type="text"
                placeholder="Kirjoita vaihe"
                className="new-recipe-step"
                id="step-2"
                name="step2"
            />
            <input
                type="text"
                placeholder="Kirjoita vaihe"
                className="new-recipe-step"
                id="step-3"
                name="step3"
            />
            <input
                type="text"
                placeholder="Kirjoita vaihe"
                className="new-recipe-step"
                id="step-4"
                name="step4"
            />
        </fieldset>
    )
}
