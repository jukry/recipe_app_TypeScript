import React, { useState } from "react"
import IngredientInput from "./IngredientInput"
import "../Pages/Account/styles/newRecipe.css"

export default function IngredientInputWrapper({ props }) {
    const [extraInputs, setExtraInputs] = useState([])
    const [extraInputNumber, setExtraInputNumber] = useState(5)
    return (
        <fieldset id="ingredients">
            <legend>Anna reseptin ainesosat</legend>
            <button
                type="button"
                id="button-add-ingredient"
                onClick={() => {
                    setExtraInputNumber((prev) => prev + 1)
                    setExtraInputs(
                        extraInputs.concat(
                            <section
                                className="ingredient-wrapper"
                                key={`ingInput${extraInputNumber}`}
                            >
                                <IngredientInput
                                    type="text"
                                    placeholder="Anna ainesosan määrä (esim. 200g)"
                                    className="new-recipe-ingredient-amount"
                                    name={`amount${extraInputNumber}`}
                                    onChange={props.handleChange}
                                />
                                <IngredientInput
                                    type="text"
                                    placeholder="Anna ainesosa"
                                    className="new-recipe-ingredient"
                                    name={`ingredient${5 + extraInputs.length}`}
                                    onChange={props.handleChange}
                                />
                            </section>
                        )
                    )
                }}
            >
                Lisää ainesosa
            </button>
            <section className="ingredient-wrapper" key={"ingInput1"}>
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosan määrä (esim. 200g)"
                    className="new-recipe-ingredient-amount"
                    name="amount1"
                    onChange={props.handleChange}
                    value={props.recipe?.amount1 || ""}
                    required={true}
                />
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosa"
                    className="new-recipe-ingredient"
                    name="ingredient1"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredient1 || ""}
                    required={true}
                />
            </section>
            <section className="ingredient-wrapper" key={"ingInput2"}>
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosan määrä (esim. 200g)"
                    className="new-recipe-ingredient-amount"
                    name="amount2"
                    onChange={props.handleChange}
                    value={props.recipe?.amount2 || ""}
                />
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosa"
                    className="new-recipe-ingredient"
                    name="ingredient2"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredient2 || ""}
                />
            </section>
            <section className="ingredient-wrapper" key={"ingInput3"}>
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosan määrä (esim. 200g)"
                    className="new-recipe-ingredient-amount"
                    name="amount3"
                    onChange={props.handleChange}
                    value={props.recipe?.amount3 || ""}
                />
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosa"
                    className="new-recipe-ingredient"
                    name="ingredient3"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredient3 || ""}
                />
            </section>
            <section className="ingredient-wrapper" key={"ingInput4"}>
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosan määrä (esim. 200g)"
                    className="new-recipe-ingredient-amount"
                    name="amount4"
                    onChange={props.handleChange}
                    value={props.recipe?.amount4 || ""}
                />
                <IngredientInput
                    type="text"
                    placeholder="Anna ainesosa"
                    className="new-recipe-ingredient"
                    name="ingredient4"
                    onChange={props.handleChange}
                    value={props.recipe?.ingredient4 || ""}
                />
            </section>
            {extraInputs}
        </fieldset>
    )
}
