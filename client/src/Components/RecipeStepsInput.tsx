import { ReactElement, useRef, useState, BaseSyntheticEvent } from "react"
import "../Pages/Account/styles/newRecipe.css"
import IngredientInput from "./IngredientInput"
import { RecipeProps } from "../utils/APIResponseTypes"

export default function RecipeStepsInput({ props }: RecipeProps) {
    const [extraSteps, setExtraSteps] = useState<Array<ReactElement>>([])
    const [extraInputNumber, setExtraInputNumber] = useState<number>(5)
    const stepsRef = useRef<(HTMLDivElement | null)[]>([])

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
                                    (stepsRef.current[extraInputNumber - 1] =
                                        el)
                                }
                            >
                                <IngredientInput
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
                                    aria-label="Poista reseptin vaihe"
                                    type="button"
                                    id={`stepButton${extraInputNumber}`}
                                    onClick={(e: BaseSyntheticEvent) => {
                                        const id = e.target.id
                                        const indexToDelete =
                                            id.split("stepButton")[1] - 1
                                        props.handleStepDelete(id)
                                        const currentStepRef =
                                            stepsRef.current[indexToDelete]
                                        if (!currentStepRef) {
                                            return null
                                        }
                                        currentStepRef.remove()
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
                ref={(el) => (stepsRef.current[0] = el)}
            >
                <IngredientInput
                    type="text"
                    placeholder="Kirjoita vaihe"
                    className="new-recipe-step"
                    id="step-1"
                    name="step1"
                    value={props.recipe?.instructions?.step1}
                    onChange={(event) => props.handleChange(event)}
                    required={true}
                    key="step1"
                />
            </div>
            <div
                className="recipe-step-wrapper"
                ref={(el) => (stepsRef.current[1] = el)}
            >
                <IngredientInput
                    type="text"
                    placeholder="Kirjoita vaihe"
                    className="new-recipe-step"
                    id="step-2"
                    name="step2"
                    value={props.recipe?.instructions?.step2}
                    onChange={(event) => props.handleChange(event)}
                    key="step2"
                />
                <button
                    className="delete-step-button"
                    aria-label="Poista reseptin vaihe"
                    type="button"
                    id="stepButton2"
                    onClick={(e: BaseSyntheticEvent) => {
                        const id = e.target.id
                        const indexToDelete = id.split("stepButton")[1] - 1
                        props.handleStepDelete(id)
                        const currentStepRef = stepsRef.current[indexToDelete]
                        if (!currentStepRef) {
                            return null
                        }
                        currentStepRef.remove()
                    }}
                >
                    -
                </button>
            </div>
            <div
                className="recipe-step-wrapper"
                ref={(el) => (stepsRef.current[2] = el)}
            >
                <IngredientInput
                    type="text"
                    placeholder="Kirjoita vaihe"
                    className="new-recipe-step"
                    id="step-3"
                    name="step3"
                    value={props.recipe?.instructions?.step3}
                    onChange={(event) => props.handleChange(event)}
                    key="step3"
                />
                <button
                    className="delete-step-button"
                    aria-label="Poista reseptin vaihe"
                    type="button"
                    id="stepButton3"
                    onClick={(e: BaseSyntheticEvent) => {
                        const id = e.target.id
                        const indexToDelete = id.split("stepButton")[1] - 1
                        props.handleStepDelete(id)
                        const currentStepRef = stepsRef.current[indexToDelete]
                        if (!currentStepRef) {
                            return null
                        }
                        currentStepRef.remove()
                    }}
                >
                    -
                </button>
            </div>
            <div
                className="recipe-step-wrapper"
                ref={(el) => (stepsRef.current[3] = el)}
            >
                <IngredientInput
                    type="text"
                    placeholder="Kirjoita vaihe"
                    className="new-recipe-step"
                    id="step-4"
                    name="step4"
                    value={props.recipe?.instructions?.step4}
                    onChange={(event) => props.handleChange(event)}
                    key="step4"
                />
                <button
                    className="delete-step-button"
                    aria-label="Poista reseptin vaihe"
                    type="button"
                    id="stepButton4"
                    onClick={(e: BaseSyntheticEvent) => {
                        const id = e.target.id
                        const indexToDelete = id.split("stepButton")[1] - 1
                        props.handleStepDelete(id)
                        const currentStepRef = stepsRef.current[indexToDelete]
                        if (!currentStepRef) {
                            return null
                        }
                        currentStepRef.remove()
                    }}
                >
                    -
                </button>
            </div>
            {extraSteps}
        </fieldset>
    )
}
