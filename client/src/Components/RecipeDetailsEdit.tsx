import { Form, useNavigation, useParams } from "react-router-dom"
import "./Styles/recipeDetailsEdit.css"
import { useQuery } from "@tanstack/react-query"
import fetchRecipeById from "../Hooks/fetchRecipeById"
import {
    BaseSyntheticEvent,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react"
import IngredientInput from "./IngredientInput"
import RecipeTagsInputEdit from "./RecipeTagsInputEdit"
import { IRecipe } from "../utils/APIResponseTypes"

function RecipeDetailsEdit() {
    const params = useParams()
    const queryResponse = useQuery(["recipe", params.id], async () =>
        fetchRecipeById({ queryKey: ["recipe", params.id as string] })
    )
    const data: IRecipe = queryResponse?.data?.message ?? []
    const navigation = useNavigation()
    document.title = data.name
    const ingredientsRef = useRef<(HTMLDivElement | null)[]>([])
    const stepsRef = useRef<(HTMLDivElement | null)[]>([])
    const [extraSteps, setExtraSteps] = useState<Array<ReactElement>>([])
    const [extraIngredients, setExtraIngredients] = useState<
        Array<ReactElement>
    >([])
    const [extraStepNumber, setExtraStepNumber] = useState(0)
    const [extraIngredientNumber, setExtraIngredientNumber] = useState(0)
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        if (data && queryResponse.isFetched) {
            setExtraStepNumber(data.instructions.length + 1 + extraStepNumber)
            setExtraIngredientNumber(
                data.ingredients.length + 1 + extraIngredientNumber
            )
            setTags(data.tags)
        }
    }, [data])
    function handleStepDelete(e: string) {
        const index = parseInt(e.split("delete-step-button-")[1])
        const currentStepsRef = stepsRef.current[index - 1]
        if (!currentStepsRef) return null
        currentStepsRef.remove()
    }
    function handleIngredientDelete(e: string) {
        const index = parseInt(e.split("delete-ingredient-button-")[1])
        const currentIngredientsRef = ingredientsRef.current[index - 1]
        if (!currentIngredientsRef) return null
        currentIngredientsRef.remove()
    }
    return data !== undefined ? (
        <Form method="post" className="recipe-wrapper-edit">
            <div className="recipe-hero-edit">
                {data.images && <img src={data.images} alt="Kuva ateriasta" />}
                <IngredientInput
                    name="name"
                    id="recipe-name"
                    placeholder={`Reseptin nimi: ${data.name}`}
                    type="text"
                />
                <IngredientInput
                    name="description"
                    id="recipe-description"
                    placeholder={`Reseptin kuvaus: ${data.description}`}
                    type="text"
                />
            </div>
            <RecipeTagsInputEdit tags={tags} setTags={setTags} />
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
                                            (stepsRef.current[
                                                extraStepNumber - 1
                                            ] = el)
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
                                            onClick={(
                                                e: BaseSyntheticEvent
                                            ) => {
                                                handleStepDelete(e.target.id)

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
                                    ref={(el) => (stepsRef.current[i] = el)}
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
                                            onClick={(
                                                e: BaseSyntheticEvent
                                            ) => {
                                                handleStepDelete(e.target.id)
                                            }}
                                            id={`delete-step-button-${i + 1}`}
                                        >
                                            -
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    {extraSteps}
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
                                            (ingredientsRef.current[
                                                extraIngredientNumber - 1
                                            ] = el)
                                        }
                                    >
                                        <IngredientInput
                                            name={`amount${extraIngredientNumber}`}
                                            placeholder={`Aineosa ${extraIngredientNumber} määrä:`}
                                            className="ingr-amount-edit"
                                            id={`amount${extraIngredientNumber}`}
                                            type="text"
                                        />
                                        <IngredientInput
                                            name={`ingredient${extraIngredientNumber}`}
                                            placeholder={`Aineosa ${extraIngredientNumber}:`}
                                            className="ingr-edit"
                                            id={`ingredient${extraIngredientNumber}`}
                                            type="text"
                                        />
                                        <button
                                            className={`delete-ingredient-button-${extraIngredientNumber} delete-ingredient-button`}
                                            type="button"
                                            id={`delete-ingredient-button-${extraIngredientNumber}`}
                                            onClick={(
                                                e: BaseSyntheticEvent
                                            ) => {
                                                handleIngredientDelete(
                                                    e.target.id
                                                )

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
                                ref={(el) => (ingredientsRef.current[i] = el)}
                            >
                                <IngredientInput
                                    name={`amount${i + 1}`}
                                    placeholder={`Aineosa ${i + 1} määrä: ${
                                        item.amount
                                    }`}
                                    className="ingr-amount-edit"
                                    id={`amount${i + 1}`}
                                    type="text"
                                />
                                <IngredientInput
                                    name={`ingredient${i + 1}`}
                                    placeholder={`Aineosa ${i + 1}: ${
                                        item.ingredient
                                    }`}
                                    className="ingr-edit"
                                    id={`ingredient${i + 1}`}
                                    type="text"
                                />
                                {i >= 1 ? (
                                    <button
                                        className={`delete-ingredient-button-${
                                            i + 1
                                        } delete-ingredient-button`}
                                        type="button"
                                        id={`delete-ingredient-button-${i + 1}`}
                                        onClick={(e: BaseSyntheticEvent) => {
                                            handleIngredientDelete(e.target.id)

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
