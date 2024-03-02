import React, {
    BaseSyntheticEvent,
    ReactElement,
    useRef,
    useState,
} from "react"
import IngredientInput from "./IngredientInput"
import "../Pages/Account/styles/newRecipe.css"
import { RecipeProps } from "../utils/APIResponseTypes"

export default function IngredientInputWrapper({ props }: RecipeProps) {
    const [extraInputs, setExtraInputs] = useState<Array<ReactElement>>([])
    const [extraInputNumber, setExtraInputNumber] = useState(5)
    const [keyValue, setKeyValue] = useState(5)
    const ingredientsRef = useRef<(HTMLDivElement | null)[]>([])
    return (
        <fieldset id="ingredients">
            <legend>Anna reseptin ainesosat</legend>
            <button
                type="button"
                id="button-add-ingredient"
                onClick={() => {
                    setExtraInputNumber((prev) => prev + 1)
                    props.setRecipe((prev) => ({
                        ...prev,
                        [`amount${extraInputNumber}`]: "",
                        [`ingredient${extraInputNumber}`]: "",
                    }))
                    setExtraInputs(
                        extraInputs.concat(
                            <div
                                className="ingredient-wrapper"
                                key={`ingInput${keyValue}`}
                                ref={(el) =>
                                    (ingredientsRef.current[
                                        extraInputNumber - 1
                                    ] = el)
                                }
                            >
                                <IngredientInput
                                    type="text"
                                    placeholder="Anna ainesosan määrä (esim. 200g)"
                                    className="new-recipe-ingredient-amount"
                                    name={`amount${extraInputNumber}`}
                                    onChange={props.handleChange}
                                    id={`new-recipe-ingredient-amount${extraInputNumber}`}
                                />
                                <IngredientInput
                                    type="text"
                                    placeholder="Anna ainesosa"
                                    className="new-recipe-ingredient"
                                    name={`ingredient${extraInputNumber}`}
                                    onChange={props.handleChange}
                                    id={`new-recipe-ingredient-ingredient${extraInputNumber}`}
                                />
                                <button
                                    className="delete-ingredient-button"
                                    aria-label="Poista ainesosa"
                                    type="button"
                                    id={`ingButton${extraInputNumber}`}
                                    onClick={(e: BaseSyntheticEvent) => {
                                        const id = e.target.id
                                        const indexToDelete =
                                            e.target.id.split("ingButton")[1] -
                                            1
                                        props.handleIngredientDelete(id)
                                        const currentIngredientRef =
                                            ingredientsRef.current[
                                                indexToDelete
                                            ]
                                        if (!currentIngredientRef) {
                                            return null
                                        }
                                        currentIngredientRef.remove()
                                    }}
                                >
                                    -
                                </button>
                            </div>
                        )
                    )
                    setKeyValue((prev) => prev + 1)
                }}
            >
                Lisää ainesosa
            </button>
            <div
                className="ingredient-wrapper"
                key={"ingInput1"}
                ref={(el) => (ingredientsRef.current[0] = el)}
            >
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosan määrä (esim. 200g)"
                    className="new-recipe-ingredient-amount"
                    name="amount1"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredients?.amount1}
                    required={true}
                    id="new-recipe-ingredient-amount1"
                />
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosa"
                    className="new-recipe-ingredient"
                    name="ingredient1"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredients?.ingredient1}
                    required={true}
                    id="new-recipe-ingredient1"
                />
            </div>
            <div
                className="ingredient-wrapper"
                key={"ingInput2"}
                ref={(el) => (ingredientsRef.current[1] = el)}
            >
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosan määrä (esim. 200g)"
                    className="new-recipe-ingredient-amount"
                    name="amount2"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredients?.amount2}
                    id="new-recipe-ingredient-amount2"
                />
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosa"
                    className="new-recipe-ingredient"
                    name="ingredient2"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredients?.ingredient2}
                    id="new-recipe-ingredient2"
                />
                <button
                    className="delete-ingredient-button"
                    type="button"
                    aria-label="Poista ainesosa"
                    id="ingButton2"
                    onClick={(e: BaseSyntheticEvent) => {
                        const id = e.target.id
                        props.handleIngredientDelete(id)
                        if (!ingredientsRef.current[1]) {
                            return null
                        }
                        ingredientsRef.current[1].remove()
                    }}
                >
                    -
                </button>
            </div>
            <div
                className="ingredient-wrapper"
                key={"ingInput3"}
                ref={(el) => (ingredientsRef.current[2] = el)}
            >
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosan määrä (esim. 200g)"
                    className="new-recipe-ingredient-amount"
                    name="amount3"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredients?.amount3}
                    id="new-recipe-ingredient-amount3"
                />
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosa"
                    className="new-recipe-ingredient"
                    name="ingredient3"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredients?.ingredient3}
                    id="new-recipe-ingredient3"
                />
                <button
                    className="delete-ingredient-button"
                    type="button"
                    aria-label="Poista ainesosa"
                    id="ingButton3"
                    onClick={(e: BaseSyntheticEvent) => {
                        const id = e.target.id
                        props.handleIngredientDelete(id)
                        if (!ingredientsRef.current[2]) {
                            return null
                        }
                        ingredientsRef.current[2].remove()
                    }}
                >
                    -
                </button>
            </div>
            <div
                className="ingredient-wrapper"
                key={"ingInput4"}
                ref={(el) => (ingredientsRef.current[3] = el)}
            >
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosan määrä (esim. 200g)"
                    className="new-recipe-ingredient-amount"
                    name="amount4"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredients?.amount4}
                    id="new-recipe-ingredient-amount4"
                />
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosa"
                    className="new-recipe-ingredient"
                    name="ingredient4"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredients?.ingredient4}
                    id="new-recipe-ingredient4"
                />
                <button
                    className="delete-ingredient-button"
                    type="button"
                    aria-label="Poista ainesosa"
                    id="ingButton4"
                    onClick={(e: BaseSyntheticEvent) => {
                        const id = e.target.id
                        props.handleIngredientDelete(id)
                        if (!ingredientsRef.current[3]) {
                            return null
                        }
                        ingredientsRef.current[3].remove()
                    }}
                >
                    -
                </button>
            </div>
            {extraInputs}
        </fieldset>
    )
}
