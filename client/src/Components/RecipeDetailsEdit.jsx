import { Form, useNavigation, useParams } from "react-router-dom"
import "./Styles/recipeDetailsEdit.css"
import { useQuery } from "@tanstack/react-query"
import fetchRecipeById from "../Hooks/fetchRecipeById.js"
import { useEffect, useRef, useState } from "react"
import IngredientInput from "./IngredientInput.jsx"
import RecipeTagsInputEdit from "./RecipeTagsInputEdit.jsx"

function RecipeDetailsEdit() {
    const params = useParams()
    const queryResponse = useQuery(["recipe", params.id], fetchRecipeById)
    const data = queryResponse?.data?.message ?? []
    const navigation = useNavigation()
    document.title = data.name
    const ingredientsRef = useRef([])
    const stepsRef = useRef([])
    const [extraSteps, setExtraSteps] = useState([])
    const [extraIngredients, setExtraIngredients] = useState([])
    const [extraStepNumber, setExtraStepNumber] = useState(0)
    const [extraIngredientNumber, setExtraIngredientNumber] = useState(0)
    const [tags, setTags] = useState([])

    useEffect(() => {
        if (data && queryResponse.isFetched) {
            setExtraStepNumber(data.instructions.length + 1 + extraStepNumber)
            setExtraIngredientNumber(
                data.ingredients.length + 1 + extraIngredientNumber
            )
            setTags(data.tags)
        }
    }, [data])
    function handleStepDelete(e) {
        const index = e.target.id.split("delete-step-button-")[1]
        stepsRef[index - 1].remove()
    }
    function handleIngredientDelete(e) {
        const index = e.target.id.split("delete-ingredient-button-")[1]
        ingredientsRef[index - 1].remove()
    }
    return data !== undefined ? (
        <Form method="post" replace="true" className="recipe-wrapper-edit">
            <div className="recipe-hero-edit">
                {data.images && <img src={data.images} alt="Kuva ateriasta" />}
                <IngredientInput
                    name="name"
                    id="recipe-name"
                    placeholder={`Reseptin nimi: ${data.name}`}
                />
                <IngredientInput
                    name="description"
                    id="recipe-description"
                    placeholder={`Reseptin kuvaus: ${data.description}`}
                />
            </div>
            <RecipeTagsInputEdit props={[tags, setTags]} />
            <div className="recipe-data-edit">
                <div id="instructions-edit">
                    <h3>Valmistusohje</h3>
                    <button
                        type="button"
                        id="button-add-step-edit"
                        onClick={() => {
                            setExtraStepNumber((prev) => prev + 1)
                            setExtraSteps(
                                extraSteps.concat(
                                    <div
                                        className="recipe-step-wrapper-edit"
                                        key={extraStepNumber}
                                        ref={(el) =>
                                            (stepsRef[extraStepNumber - 1] = el)
                                        }
                                    >
                                        <IngredientInput
                                            name={`step${extraStepNumber}`}
                                            placeholder={`Vaihe ${extraStepNumber}`}
                                            className="recipe-step-edit"
                                            id={`step${extraStepNumber}`}
                                            type="text"
                                        />
                                        <button
                                            className={`delete-button-${extraStepNumber} delete-step-button`}
                                            type="button"
                                            onClick={(e) => {
                                                handleStepDelete(e)

                                                setExtraStepNumber(
                                                    (prev) => prev - 1
                                                )
                                            }}
                                            id={`delete-step-button-${extraStepNumber}`}
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
                    {data?.instructions?.map((item, i) => {
                        return (
                            <div
                                className={`recipe-step-container-${
                                    i + 1
                                } recipe-step-container`}
                                key={i}
                            >
                                <div
                                    className="recipe-step-wrapper-edit"
                                    ref={(el) => (stepsRef[i] = el)}
                                >
                                    <IngredientInput
                                        name={`step${i + 1}`}
                                        placeholder={`Vaihe ${i + 1}: ${item}`}
                                        className="recipe-step-edit"
                                        id={`step${i + 1}`}
                                        type="text"
                                    />
                                    {i >= 1 ? (
                                        <button
                                            className={`delete-button-${
                                                i + 1
                                            } delete-step-button`}
                                            type="button"
                                            onClick={(e) => {
                                                handleStepDelete(e)
                                                stepsRef[i].remove()
                                            }}
                                            id={`delete-step-button-${i + 1}`}
                                        >
                                            -
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                {extraSteps}
                            </div>
                        )
                    })}
                </div>
                <div id="ingredients-edit">
                    <h3>Ainesosat</h3>
                    <button
                        type="button"
                        id="button-add-ingredient-edit"
                        onClick={(e) => {
                            setExtraIngredientNumber((prev) => prev + 1)
                            setExtraIngredients(
                                extraIngredients.concat(
                                    <div
                                        className={`ingr-line-edit-${extraIngredientNumber} ingr-line-edit`}
                                        key={extraIngredientNumber}
                                        id={`ingr-line-container-${extraIngredientNumber}`}
                                        ref={(el) =>
                                            (ingredientsRef[
                                                extraIngredientNumber - 1
                                            ] = el)
                                        }
                                    >
                                        <IngredientInput
                                            name={`amount${extraIngredientNumber}`}
                                            placeholder={`Aineosa ${extraIngredientNumber} määrä:`}
                                            className="ingr-amount-edit"
                                            id={`amount${extraIngredientNumber}`}
                                        />
                                        <IngredientInput
                                            name={`ingredient${extraIngredientNumber}`}
                                            placeholder={`Aineosa ${extraIngredientNumber}:`}
                                            className="ingr-edit"
                                            id={`ingredient${extraIngredientNumber}`}
                                        />
                                        <button
                                            className={`delete-ingredient-button-${extraIngredientNumber} delete-ingredient-button`}
                                            type="button"
                                            id={`delete-ingredient-button-${extraIngredientNumber}`}
                                            onClick={(e) => {
                                                handleIngredientDelete(e)

                                                setExtraIngredientNumber(
                                                    (prev) => prev - 1
                                                )
                                            }}
                                        >
                                            -
                                        </button>
                                    </div>
                                )
                            )
                        }}
                    >
                        Lisää ainesosa
                    </button>
                    {data?.ingredients?.map((item, i) => {
                        return (
                            <div
                                className={`ingr-line-edit-${
                                    i + 1
                                } ingr-line-edit`}
                                key={i}
                                id={`ingr-line-container-${i + 1}`}
                                ref={(el) => (ingredientsRef[i] = el)}
                            >
                                <IngredientInput
                                    name={`amount${i + 1}`}
                                    placeholder={`Aineosa ${i + 1} määrä: ${
                                        item.amount
                                    }`}
                                    className="ingr-amount-edit"
                                    id={`amount${i + 1}`}
                                />
                                <IngredientInput
                                    name={`ingredient${i + 1}`}
                                    placeholder={`Aineosa ${i + 1}: ${
                                        item.ingredient
                                    }`}
                                    className="ingr-edit"
                                    id={`ingredient${i + 1}`}
                                />
                                {i >= 1 ? (
                                    <button
                                        className={`delete-ingredient-button-${
                                            i + 1
                                        } delete-ingredient-button`}
                                        type="button"
                                        id={`delete-ingredient-button-${i + 1}`}
                                        onClick={(e) => {
                                            handleIngredientDelete(e)

                                            setExtraIngredientNumber(
                                                (prev) => prev - 1
                                            )
                                        }}
                                    >
                                        -
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        )
                    })}
                    {extraIngredients}
                </div>
            </div>
            <button
                id="update-recipe"
                disabled={navigation.state === "submitting"}
            >
                {navigation.state === "idle"
                    ? "Päivitä resepti"
                    : "Päivitetään..."}
            </button>
        </Form>
    ) : (
        <h3>Ei mtn</h3>
    )
}
export default RecipeDetailsEdit
