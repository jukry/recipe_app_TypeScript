import React, { useRef, useState } from "react"
import "../Pages/Account/styles/newRecipe.css"

export default function RecipeStepsInput({ props }) {
    const [extraSteps, setExtraSteps] = useState([])
    const [extraInputNumber, setExtraInputNumber] = useState(5)
    const stepsRef = useRef([])

    return (
        <fieldset id="recipe-steps">
            <legend>Anna reseptin valmistusohje</legend>
            <button
                type="button"
                id="button-add-step"
                onClick={() => {
                    setExtraInputNumber((prev) => prev + 1)
                    props.setRecipe((prev) => ({
                        ...prev,
                        [`step${extraInputNumber}`]: "",
                    }))
                    setExtraSteps(
                        extraSteps.concat(
                            <div
                                className="recipe-step-wrapper"
                                key={`step${extraInputNumber}`}
                                ref={(el) =>
                                    (stepsRef[extraInputNumber - 1] = el)
                                }
                            >
                                <input
                                    type="text"
                                    placeholder="Kirjoita vaihe"
                                    className="new-recipe-step"
                                    id={`step-${extraInputNumber}`}
                                    name={`step${extraInputNumber}`}
                                    onChange={(event) =>
                                        props.handleChange(event)
                                    }
                                />
                                <button
                                    className="delete-step-button"
                                    type="button"
                                    id={`stepButton${extraInputNumber}`}
                                    onClick={(e) => {
                                        const indexToDelete =
                                            e.target.id.split("stepButton")[1] -
                                            1
                                        props.handleStepDelete(e)
                                        stepsRef[indexToDelete].remove()
                                    }}
                                >
                                    -
                                </button>
                            </div>
                        )
                    )
                }}
            >
                Lisää vaihe
            </button>
            <div
                className="recipe-step-wrapper"
                ref={(el) => (stepsRef[0] = el)}
            >
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
            </div>
            <div
                className="recipe-step-wrapper"
                ref={(el) => (stepsRef[1] = el)}
            >
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
                <button
                    className="delete-step-button"
                    type="button"
                    id="stepButton2"
                    onClick={(e) => {
                        stepsRef[1].remove()
                        props.handleStepDelete(e)
                    }}
                >
                    -
                </button>
            </div>
            <div
                className="recipe-step-wrapper"
                ref={(el) => (stepsRef[2] = el)}
            >
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
                <button
                    className="delete-step-button"
                    type="button"
                    id="stepButton3"
                    onClick={(e) => {
                        stepsRef[2].remove()
                        props.handleStepDelete(e)
                    }}
                >
                    -
                </button>
            </div>
            <div
                className="recipe-step-wrapper"
                ref={(el) => (stepsRef[3] = el)}
            >
                <input
                    type="text"
                    placeholder="Kirjoita vaihe"
                    className="new-recipe-step"
                    id="step-4"
                    name="step4"
                    value={props.recipe?.step4 || ""}
                    onChange={(event) => props.handleChange(event)}
                    key="step4"
                    ref={(el) => (stepsRef[3] = el)}
                />
                <button
                    className="delete-step-button"
                    type="button"
                    id="stepButton4"
                    onClick={(e) => {
                        stepsRef[3].remove()
                        props.handleStepDelete(e)
                    }}
                >
                    -
                </button>
            </div>
            {extraSteps}
        </fieldset>
    )
}
