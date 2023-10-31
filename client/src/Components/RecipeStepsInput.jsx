import React, { useState } from "react"
import "../Pages/Account/styles/newRecipe.css"

export default function RecipeStepsInput({ props }) {
    const [extraSteps, setExtraSteps] = useState([])
    const [extraInputNumber, setExtraInputNumber] = useState(5)

    return (
        <fieldset id="recipe-steps">
            <legend>Anna reseptin valmistusohje</legend>
            <button
                type="button"
                id="button-add-step"
                onClick={() => {
                    setExtraInputNumber((prev) => prev + 1)
                    setExtraSteps(
                        extraSteps.concat(
                            <input
                                type="text"
                                placeholder="Kirjoita vaihe"
                                className="new-recipe-step"
                                id={`step-${extraInputNumber}`}
                                name={`step${extraInputNumber}`}
                                //value={props.recipe?.step1 || ""}
                                onChange={(event) => props.handleChange(event)}
                                key={`step${extraInputNumber}`}
                            />
                        )
                    )
                }}
            >
                Lisää vaihe
            </button>
            <input
                type="text"
                placeholder="Kirjoita vaihe"
                className="new-recipe-step"
                id="step-1"
                name="step1"
                value={props.recipe?.step1 || ""}
                onChange={(event) => props.handleChange(event)}
                required={true}
                key="step1"
            />
            <input
                type="text"
                placeholder="Kirjoita vaihe"
                className="new-recipe-step"
                id="step-2"
                name="step2"
                value={props.recipe?.step2 || ""}
                onChange={(event) => props.handleChange(event)}
                key="step2"
            />
            <input
                type="text"
                placeholder="Kirjoita vaihe"
                className="new-recipe-step"
                id="step-3"
                name="step3"
                value={props.recipe?.step3 || ""}
                onChange={(event) => props.handleChange(event)}
                key="step3"
            />
            <input
                type="text"
                placeholder="Kirjoita vaihe"
                className="new-recipe-step"
                id="step-4"
                name="step4"
                value={props.recipe?.step4 || ""}
                onChange={(event) => props.handleChange(event)}
                key="step4"
            />
            {extraSteps}
        </fieldset>
    )
}
